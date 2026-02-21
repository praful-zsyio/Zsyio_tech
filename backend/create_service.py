import os
import django
import sys

# Setup Django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.services.models import Service

def create_service():
    slug = "data-nalytics"
    print(f"Checking for service with slug: {slug}")
    
    service, created = Service.objects.get_or_create(
        slug=slug,
        defaults={
            "title": "Data Analytics",
            "description": "Professional data analytics services to help you make informed decisions based on your data.",
            "icon": "BarChart",
            "base_rate": 500.00,
            "hourly_rate": 50.00,
            "gradient": "from-blue-500 to-cyan-500"
        }
    )
    
    if created:
        print(f"Successfully created service: {service.title} ({service.slug})")
    else:
        print(f"Service already exists: {service.title} ({service.slug})")

    # Also retrieve all services to show available ones
    all_services = Service.objects.all()
    print("\n--- Available Services ---")
    for s in all_services:
        print(f"- {s.title} (slug: {s.slug})")

if __name__ == "__main__":
    create_service()
