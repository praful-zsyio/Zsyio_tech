#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

# Convert static files
python manage.py collectstatic --no-input

# Apply any outstanding database migrations
python manage.py migrate

# Create superuser for admin access
python create_superuser.py