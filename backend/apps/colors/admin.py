from django.contrib import admin
from .models import ColorPalette, ColorScheme, CustomColor, GradientPreset


@admin.register(ColorPalette)
class ColorPaletteAdmin(admin.ModelAdmin):
    list_display = ['name', 'is_default', 'is_active', 'primary', 'secondary', 'accent', 'created_at']
    list_filter = ['is_active', 'is_default', 'created_at']
    search_fields = ['name', 'description']
    fieldsets = (
        ('Basic Info', {
            'fields': ('name', 'description', 'is_active', 'is_default')
        }),
        ('Primary Colors', {
            'fields': ('primary', 'primary_light', 'primary_dark')
        }),
        ('Secondary Colors', {
            'fields': ('secondary', 'secondary_light', 'secondary_dark')
        }),
        ('Accent Colors', {
            'fields': ('accent', 'accent_light', 'accent_dark')
        }),
        ('Semantic Colors', {
            'fields': ('success', 'warning', 'error', 'info')
        }),
        ('Neutral Colors', {
            'fields': ('background', 'surface', 'text_primary', 'text_secondary', 'border')
        }),
    )


@admin.register(ColorScheme)
class ColorSchemeAdmin(admin.ModelAdmin):
    list_display = ['name', 'palette', 'theme_type', 'is_active', 'created_at']
    list_filter = ['theme_type', 'is_active', 'palette']
    search_fields = ['name']


@admin.register(CustomColor)
class CustomColorAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'css_variable', 'color_value', 'is_active']
    list_filter = ['category', 'is_active']
    search_fields = ['name', 'css_variable']


@admin.register(GradientPreset)
class GradientPresetAdmin(admin.ModelAdmin):
    list_display = ['name', 'gradient_type', 'is_active', 'created_at']
    list_filter = ['gradient_type', 'is_active']
    search_fields = ['name', 'description']
