"""
Management command to seed/update Zsyio team users in MongoDB.

Usage:
    python manage.py seed_users

This command creates or updates the 5 Zsyio team accounts with
their correct hashed passwords, storing them in the 'users' MongoDB collection.
"""

from django.core.management.base import BaseCommand
from django.contrib.auth.hashers import make_password
from django.conf import settings
import datetime


ZSYIO_USERS = [
    {
        "email": "praful@zsyio.com",
        "username": "praful@zsyio.com",
        "password": "Praful@zsyio12s",
        "first_name": "Praful",
        "last_name": "",
        "is_staff": True,
        "is_superuser": False,
    },
    {
        "email": "arpit@zsyio.com",
        "username": "arpit@zsyio.com",
        "password": "Arpit@zsyio12n",
        "first_name": "Arpit",
        "last_name": "",
        "is_staff": True,
        "is_superuser": False,
    },
    {
        "email": "ashutosh@zsyio.com",
        "username": "ashutosh@zsyio.com",
        "password": "Ashutosh@zsyio12k",
        "first_name": "Ashutosh",
        "last_name": "",
        "is_staff": True,
        "is_superuser": False,
    },
    {
        "email": "ayan@zsyio.com",
        "username": "ayan@zsyio.com",
        "password": "Ayan@zsyio12m",
        "first_name": "Ayan",
        "last_name": "",
        "is_staff": True,
        "is_superuser": False,
    },
    {
        "email": "abhishek@zsyio.com",
        "username": "abhishek@zsyio.com",
        "password": "Abhishek@zsyio12t",
        "first_name": "Abhishek",
        "last_name": "",
        "is_staff": True,
        "is_superuser": False,
    },
]


class Command(BaseCommand):
    help = "Seed or update Zsyio team users in MongoDB with correct passwords."

    def handle(self, *args, **kwargs):
        client = getattr(settings, 'MONGO_CLIENT', None)
        if not client:
            self.stderr.write(self.style.ERROR(
                "MongoDB not connected. Check MONGO_URI in your .env file."
            ))
            return

        db = client['zsyio_db']
        users_collection = db['users']

        for user_data in ZSYIO_USERS:
            email = user_data['email']
            raw_password = user_data.pop('password')
            hashed_password = make_password(raw_password)

            update_doc = {
                **user_data,
                "password": hashed_password,
                "is_active": True,
                "updated_at": datetime.datetime.utcnow(),
            }

            result = users_collection.update_one(
                {"email": email},
                {
                    "$set": update_doc,
                    "$setOnInsert": {"created_at": datetime.datetime.utcnow()},
                },
                upsert=True,
            )

            if result.upserted_id:
                self.stdout.write(self.style.SUCCESS(f"  ✅ Created: {email}"))
            else:
                self.stdout.write(self.style.SUCCESS(f"  🔄 Updated: {email}"))

        self.stdout.write(self.style.SUCCESS(
            "\n✅ All 5 Zsyio team users seeded/updated successfully!"
        ))
