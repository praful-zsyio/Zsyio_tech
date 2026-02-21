import os
import django
import sys

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.services.models import Service

services_to_delete = ["web-designing", "data-nalytics"]
# Also check for "data-analytics" just in case it was a typo in my manual view
slugs_to_check = ["web-designing", "data-nalytics", "data-analytics", "desigining"]


log_file = "deletion_log.txt"

def log(msg):
    with open(log_file, "a") as f:
        f.write(msg + "\n")


ids_to_delete = [19, 20]

log("\nAttempting to delete by ID...")
for s_id in ids_to_delete:
    log(f"Checking for ID: {s_id}")
    try:
        service = Service.objects.filter(id=s_id).first()
        if service:
            log(f"Found service: ID {service.id}, Title '{service.title}', Slug '{service.slug}'")
            service.delete()
            log("Deleted successfully.")
        else:
            log(f"Service with ID {s_id} not found.")
    except Exception as e:
        log(f"Error checking ID {s_id}: {e}")

# Check by title (case-insensitive) just to be sure
titles_to_check = ["Web Designing", "Data Analytics"]
for title in titles_to_check:
    log(f"Checking for title: '{title}'")
    services = Service.objects.filter(title__iexact=title)
    if services.exists():
        for s in services:
            log(f"Found service by title: ID {s.id}, Title '{s.title}', Slug '{s.slug}'")
            s.delete()
            log("Deleted successfully.")
    else:
        log(f"Service with title '{title}' not found.")

log("Process completed.")
