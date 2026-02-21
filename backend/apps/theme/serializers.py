from rest_framework import serializers
from .models import ThemePreference, GlobalThemeConfig


class ThemePreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThemePreference
        fields = ['id', 'theme_mode', 'primary_color', 'accent_color', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class GlobalThemeConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = GlobalThemeConfig
        fields = ['id', 'default_theme', 'allow_user_customization', 'brand_primary', 'brand_secondary', 'brand_accent', 'updated_at']
        read_only_fields = ['id', 'updated_at']
