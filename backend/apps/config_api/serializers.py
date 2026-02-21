from rest_framework import serializers
from .models import SiteConfig, PrivacyConsent

class SiteConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfig
        fields = '__all__'

class PrivacyConsentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrivacyConsent
        fields = ['status', 'ip_address', 'timestamp']

