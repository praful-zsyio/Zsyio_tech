import os
import django
import sys

# Setup Django Environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.services.models import Technology

# Define Technologies Data
technologies_data = [
    # Frontend
    {"name": "React", "icon": "Atom", "color": "#61DAFB", "category": "Frontend"},
    {"name": "Next.js", "icon": "Layers", "color": "#000000", "category": "Frontend"},
    {"name": "Tailwind CSS", "icon": "Wind", "color": "#38B2AC", "category": "Frontend"},
    {"name": "TypeScript", "icon": "FileCode", "color": "#3178C6", "category": "Frontend"},

    # Backend
    {"name": "Django", "icon": "Box", "color": "#092E20", "category": "Backend"},
    {"name": "Node.js", "icon": "Server", "color": "#339933", "category": "Backend"},
    {"name": "Python", "icon": "Code", "color": "#FFD43B", "category": "Backend"},
    {"name": "FastAPI", "icon": "Zap", "color": "#009688", "category": "Backend"},

    # Databases
    {"name": "PostgreSQL", "icon": "Database", "color": "#336791", "category": "Databases"},
    {"name": "MongoDB", "icon": "Database", "color": "#47A248", "category": "Databases"},
    {"name": "Redis", "icon": "Database", "color": "#DC382D", "category": "Databases"},

    # Cloud Solutions
    {"name": "AWS", "icon": "Cloud", "color": "#FF9900", "category": "Cloud Solutions"},
    {"name": "Docker", "icon": "Container", "color": "#2496ED", "category": "Cloud Solutions"},
    {"name": "Kubernetes", "icon": "Ship", "color": "#326CE5", "category": "Cloud Solutions"},
    
    # DevOps
    {"name": "Git", "icon": "GitBranch", "color": "#F05032", "category": "DevOps"},
    {"name": "GitHub Actions", "icon": "PlayCircle", "color": "#2088FF", "category": "DevOps"},
    
    # Mobile
    {"name": "React Native", "icon": "Smartphone", "color": "#61DAFB", "category": "Mobile"},
    {"name": "Flutter", "icon": "Smartphone", "color": "#02569B", "category": "Mobile"},
]

def seed_technologies():
    print(f"Starting to seed {len(technologies_data)} technologies...")
    added_count = 0
    updated_count = 0
    
    for tech in technologies_data:
        obj, created = Technology.objects.update_or_create(
            name=tech['name'],
            defaults={
                'icon': tech['icon'],
                'color': tech['color'],
                'category': tech['category']
            }
        )
        if created:
            added_count += 1
            print(f"Created: {tech['name']}")
        else:
            updated_count += 1
            print(f"Updated: {tech['name']}")
            
    print("-" * 30)
    print(f"Seeding Complete.")
    print(f"Added: {added_count}")
    print(f"Updated: {updated_count}")
    print(f"Total Technologies: {Technology.objects.count()}")

if __name__ == "__main__":
    seed_technologies()
