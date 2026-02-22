import datetime
from django.core.management.base import BaseCommand
from apps.utils.mongo import get_mongo_db

class Command(BaseCommand):
    help = 'Seed services and technologies with diverse icons and data'

    def handle(self, *args, **options):
        db = get_mongo_db()
        if not db:
            self.stderr.write(self.style.ERROR('Could not connect to MongoDB'))
            return

        # 1. Clear existing data
        db['services'].delete_many({})
        db['technologies'].delete_many({})

        # 2. Seed Services (Diverse Icons)
        services = [
            {
                "slug": "cloud-hosting",
                "title": "Cloud Web Hosting",
                "description": "High-performance AWS-powered hosting with free SSL, daily backups, and 99.9% uptime guarantee.",
                "icon": "Cloud",
                "gradient": "bg-gradient-to-br from-blue-500 to-indigo-600",
                "base_rate": 500.0,
                "hourly_rate": 20.0,
                "created_at": datetime.datetime.utcnow()
            },
            {
                "slug": "web-development",
                "title": "Web Development",
                "description": "Custom web applications built with modern frameworks like React and Django. Scalable and secure.",
                "icon": "Code",
                "gradient": "bg-gradient-to-br from-emerald-500 to-teal-600",
                "base_rate": 1500.0,
                "hourly_rate": 45.0,
                "created_at": datetime.datetime.utcnow()
            },
            {
                "slug": "mobile-app-dev",
                "title": "Mobile App Development",
                "description": "Native and cross-platform mobile applications for iOS and Android using React Native and Flutter.",
                "icon": "Smartphone",
                "gradient": "bg-gradient-to-br from-orange-500 to-rose-600",
                "base_rate": 2500.0,
                "hourly_rate": 60.0,
                "created_at": datetime.datetime.utcnow()
            },
            {
                "slug": "ui-ux-design",
                "title": "UI/UX Design",
                "description": "User-centric design focused on creating intuitive, beautiful, and engaging digital experiences.",
                "icon": "Palette",
                "gradient": "bg-gradient-to-br from-purple-500 to-pink-600",
                "base_rate": 1000.0,
                "hourly_rate": 40.0,
                "created_at": datetime.datetime.utcnow()
            }
        ]
        db['services'].insert_many(services)
        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {len(services)} services'))

        # 3. Seed Technologies (Diverse Icons)
        technologies = [
            # Frontend
            {"name": "React", "icon": "Atom", "color": "#61DAFB", "category": "Frontend"},
            {"name": "Next.js", "icon": "Globe", "color": "#FFFFFF", "category": "Frontend"},
            {"name": "Tailwind CSS", "icon": "Layout", "color": "#38B2AC", "category": "Frontend"},
            # Backend
            {"name": "Django", "icon": "Shield", "color": "#092E20", "category": "Backend"},
            {"name": "Node.js", "icon": "Server", "color": "#339933", "category": "Backend"},
            {"name": "Python", "icon": "Terminal", "color": "#3776AB", "category": "Backend"},
            # Databases
            {"name": "MongoDB", "icon": "Database", "color": "#47A248", "category": "Databases"},
            {"name": "PostgreSQL", "icon": "Database", "color": "#336791", "category": "Databases"},
            # Cloud
            {"name": "AWS", "icon": "Cloud", "color": "#FF9900", "category": "Cloud Solutions"},
            {"name": "Docker", "icon": "Box", "color": "#2496ED", "category": "Cloud Solutions"},
        ]
        db['technologies'].insert_many(technologies)
        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {len(technologies)} technologies'))
