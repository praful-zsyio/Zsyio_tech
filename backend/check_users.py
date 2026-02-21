import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth.models import User

print("Checking users in database...")
try:
    users = User.objects.all()
    for user in users:
        print(f"ID: {user.id}, Username: '{user.username}', Email: '{user.email}', Is Active: {user.is_active}")
        
    username_to_check = "praful@zsyio.com"
    email_to_check = "praful@zsyio.com"
    
    u_by_username = User.objects.filter(username=username_to_check).first()
    if u_by_username:
        print(f"\nUser found by username '{username_to_check}': {u_by_username}")
    else:
        print(f"\nUser NOT found by username '{username_to_check}'")
        
    u_by_email = User.objects.filter(email=email_to_check).first()
    if u_by_email:
        print(f"User found by email '{email_to_check}': {u_by_email} (Username: {u_by_email.username})")
    else:
        print(f"User NOT found by email '{email_to_check}'")

except Exception as e:
    print(f"Error: {e}")
