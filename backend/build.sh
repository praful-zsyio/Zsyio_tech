#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

# Convert static files
python manage.py collectstatic --no-input

# Skip migrations as we use a mock MongoDB engine
# python manage.py migrate

# Create superuser is handled by our direct MongoDB seeding / auto-seed on login
# python create_superuser.py