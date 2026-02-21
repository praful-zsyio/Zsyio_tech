import os
import sys

LOG_FILE = "password_update_detailed_log.txt"

def log(msg):
    with open(LOG_FILE, "a") as f:
        f.write(msg + "\n")

log("Script started")

try:
    import django
    log("Django imported")
    
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
    try:
        django.setup()
        log("Django setup complete")
    except Exception as e:
        log(f"Django setup failed: {e}")
        raise e

    from django.contrib.auth import get_user_model
    try:
        User = get_user_model()
        log("User model retrieved")
    except Exception as e:
        log(f"User model retrieval failed: {e}")
        raise e

    USERS_CONFIG = {
        "praful@zsyio.com": "Praful@zsyio12s",
        "abhishek@zsyio.com": "Abhishek@zsyio@12t",
        "arpit@zsyio.com": "Arpit@zsyio12n",
        "ayan@zsyio.com": "Ayan@zsyio12m",
        "ashutosh@zsyio.com": "Ashutosh@zsyio12k"
    }


    log("Starting user loop")
    for email, password in USERS_CONFIG.items():
        log(f"Processing {email}")
        username = email
        
        try:
            log(f"Attempting to get or create user {username}")
            user, created = User.objects.get_or_create(
                username=username,
                defaults={'email': email}
            )
            log(f"User retrieved: {user}, Created: {created}")
            
            if user.email != email:
                log(f"Updating email from {user.email} to {email}")
                user.email = email
            
            name_part = email.split('@')[0].capitalize()
            # If name is empty, set it
            if not user.first_name:
                log(f"Setting first name to {name_part}")
                user.first_name = name_part
            
            log(f"Setting password to {password}")
            user.set_password(password)
            log("Password set")

            log("Saving user")
            user.save()
            log("User saved")
            
            status = "Created" if created else "Updated"
            log(f"{status} user {username}")
            
        except Exception as e:
            log(f"Error processing {username}: {e}")
            import traceback
            log(traceback.format_exc())

    log("Script finished successfully")

except Exception as e:
    log(f"Fatal error: {e}")
