"""
Authentication serializer for Zsyio backend.
Validates users against the MongoDB 'users' collection (seeded via seed_users command).
Falls back to Django's built-in auth for superusers.
"""

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from django.contrib.auth.hashers import check_password
from django.conf import settings
from bson.objectid import ObjectId
import datetime


# -----------------------------------------------------------------
# Helper: Get MongoDB users collection
# -----------------------------------------------------------------
def _get_users_collection():
    client = getattr(settings, 'MONGO_CLIENT', None)
    if client:
        return client['zsyio_db']['users']
    return None


# -----------------------------------------------------------------
# Minimal user-like object for SimpleJWT to work with
# -----------------------------------------------------------------
class MongoUser:
    """Lightweight user object built from a MongoDB document."""

    is_anonymous = False
    is_authenticated = True

    def __init__(self, doc):
        self.id = str(doc.get('_id', ''))
        self.pk = self.id
        self.email = doc.get('email', '')
        self.username = doc.get('username', self.email)
        self.first_name = doc.get('first_name', '')
        self.last_name = doc.get('last_name', '')
        self.is_active = doc.get('is_active', True)
        self.is_staff = doc.get('is_staff', False)
        self.is_superuser = doc.get('is_superuser', False)
        self._password = doc.get('password', '')

    def get_full_name(self):
        name = f"{self.first_name} {self.last_name}".strip()
        return name or self.username

    def check_password(self, raw_password):
        return check_password(raw_password, self._password)

    # Required for SimpleJWT token generation
    def __str__(self):
        return self.username


# -----------------------------------------------------------------
# Custom Token Serializer
# -----------------------------------------------------------------
class AllowedEmailTokenObtainPairSerializer(serializers.Serializer):
    """
    Custom JWT login serializer that authenticates against MongoDB 'users' collection.
    Accepts: login_id OR username (both treated as email), plus password.
    """

    login_id = serializers.CharField(required=False, write_only=True, label="Email")
    username = serializers.CharField(required=False, write_only=True, label="Username (Email)")
    password = serializers.CharField(required=True, write_only=True, style={"input_type": "password"})

    def validate(self, attrs):
        # Resolve email from either field
        email = (attrs.get('login_id') or attrs.get('username') or '').strip().lower()

        if not email:
            raise serializers.ValidationError(
                {"login_id": "Email (login_id or username) is required."}
            )

        raw_password = attrs.get('password', '')

        # ── Check allowed list ──────────────────────────────────────
        allowed_emails = getattr(settings, 'ALLOWED_LOGIN_EMAILS', [])
        if allowed_emails and email not in [e.lower() for e in allowed_emails]:
            raise serializers.ValidationError(
                {"detail": "This email is not authorised to log in."}
            )

        # ── Look up user in MongoDB ─────────────────────────────────
        coll = _get_users_collection()
        if coll is None:
            raise serializers.ValidationError(
                {"detail": "Database not available. Please try again later."}
            )

        doc = coll.find_one({"email": email})
        if not doc:
            # Also try case-insensitive match
            import re
            doc = coll.find_one({"email": re.compile(f"^{re.escape(email)}$", re.I)})

        if not doc:
            raise serializers.ValidationError(
                {"detail": "Invalid credentials. Please check your email and password."}
            )

        user = MongoUser(doc)

        if not user.check_password(raw_password):
            raise serializers.ValidationError(
                {"detail": "Invalid credentials. Please check your email and password."}
            )

        if not user.is_active:
            raise serializers.ValidationError(
                {"detail": "This account has been disabled."}
            )

        # ── Generate JWT tokens ─────────────────────────────────────
        refresh = RefreshToken()
        refresh['user_id'] = user.id
        refresh['email'] = user.email
        refresh['username'] = user.username

        access = refresh.access_token

        full_name = user.get_full_name()

        return {
            'refresh': str(refresh),
            'access': str(access),
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'full_name': full_name,
            },
        }
