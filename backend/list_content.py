import os
import django
import sys

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.services.models import Service, Technology

with open("content_list.txt", "w") as f:
    f.write("--- Services ---\n")
    services = Service.objects.all()
    for s in services:
        f.write(f"ID: {s.id}, Title: '{s.title}', Slug: '{s.slug}'\n")

    f.write("\n--- Technologies ---\n")
    techs = Technology.objects.all()
    for t in techs:
        f.write(f"ID: {t.id}, Name: '{t.name}', Category: '{t.category}'\n")
