import os
import django
import sys

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.conf import settings
from django.contrib.auth import get_user_model
User = get_user_model()

# List of allowed emails from settings
allowed_emails = getattr(settings, "ALLOWED_LOGIN_EMAILS", [])

# Password to set for new users
DEFAULT_PASSWORD = "Praful@zsyio12s"

with open("creation_log.txt", "w") as f:
    f.write("Starting user creation process...\n")

    for email in allowed_emails:
        username = email  # Using email as username for consistency with login logic
        
        # Check if user already exists
        if User.objects.filter(username=username).exists():
            f.write(f"User '{username}' already exists. Skipping.\n")
            continue
            
        if User.objects.filter(email=email).exists():
            f.write(f"User with email '{email}' already exists. Skipping.\n")
            continue

        try:
            # Create the user
            f.write(f"Creating user: {username} ({email})\n")
            user = User.objects.create_user(
                username=username,
                email=email,
                password=DEFAULT_PASSWORD
            )
            
            # Optionally set first/last name based on email prefix
            name_part = email.split('@')[0].capitalize()
            user.first_name = name_part
            user.save()
            
            f.write(f"Successfully created user '{username}' with password '{DEFAULT_PASSWORD}'\n")
            
        except Exception as e:
            f.write(f"Error creating user '{username}': {e}\n")

    f.write("\nProcess completed.\n")
