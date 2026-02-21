import os
import django
import sys

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.services.models import Service


with open("services_list.txt", "w") as f:
    f.write("Listing all Services:\n")
    services = Service.objects.all()
    if not services:
        f.write("No services found in database.\n")
    for service in services:
        f.write(f"ID: {service.id}, Title: '{service.title}', Slug: '{service.slug}'\n")

    f.write("\n")
