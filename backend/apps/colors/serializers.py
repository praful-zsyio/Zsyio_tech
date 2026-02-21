from rest_framework import serializers
from .models import ColorPalette, ColorScheme, CustomColor, GradientPreset


class ColorPaletteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ColorPalette
        fields = '__all__'


class ColorSchemeSerializer(serializers.ModelSerializer):
    palette_name = serializers.CharField(source='palette.name', read_only=True)
    
    class Meta:
        model = ColorScheme
        fields = '__all__'


class CustomColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomColor
        fields = '__all__'


class GradientPresetSerializer(serializers.ModelSerializer):
    class Meta:
        model = GradientPreset
        fields = '__all__'
