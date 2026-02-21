from rest_framework import serializers
from .models import ContactSubmission

class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ['id', 'name', 'email', 'phone', 'message', 'created_at']
