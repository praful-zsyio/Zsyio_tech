import os
import django
import sys

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.projects.models import Project

with open('projects_output.txt', 'w') as f:
    qs = Project.objects.all()
    f.write(f"Count: {qs.count()}\n")
    for p in qs:
        f.write(f"ID: {p.id}, Title: {p.title}\n")
    if qs.count() == 0:
        f.write("No projects found.\n")
