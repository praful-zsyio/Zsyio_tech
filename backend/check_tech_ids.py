import os
import django
import sys

# Setup Django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.services.models import Technology

def list_technologies():
    techs = Technology.objects.all()
    print(f"Total Technologies found: {techs.count()}")
    print("-" * 40)
    print(f"{'ID':<5} | {'Name':<20} | {'Category'}")
    print("-" * 40)
    for tech in techs:
        print(f"{tech.id:<5} | {tech.name:<20} | {tech.category}")

if __name__ == '__main__':
    try:
        list_technologies()
    except Exception as e:
        print(f"Error: {e}")
