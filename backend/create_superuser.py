import os
import django
from django.contrib.auth import get_user_model

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

User = get_user_model()

username = os.environ.get("DJANGO_SUPERUSER_USERNAME", "admin")
email = os.environ.get("DJANGO_SUPERUSER_EMAIL", "admin@zsyio.com")
password = os.environ.get("DJANGO_SUPERUSER_PASSWORD", "Admin123!")

if not User.objects.filter(username=username).exists():
    print(f"Creating superuser: {username} ({email})")
    try:
        User.objects.create_superuser(username, email, password)
        print(f"Superuser '{username}' created successfully.")
    except Exception as e:
        print(f"Error creating superuser: {e}")
else:
    print(f"Superuser '{username}' already exists.")
