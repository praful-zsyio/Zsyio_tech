from rest_framework import serializers
from .models import Subscriber

class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = ['id', 'email', 'created_at']
