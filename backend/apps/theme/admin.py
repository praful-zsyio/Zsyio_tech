from django.contrib import admin
from .models import ThemePreference, GlobalThemeConfig


@admin.register(ThemePreference)
class ThemePreferenceAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'session_id', 'theme_mode', 'created_at', 'updated_at']
    list_filter = ['theme_mode', 'created_at']
    search_fields = ['user__username', 'session_id']


@admin.register(GlobalThemeConfig)
class GlobalThemeConfigAdmin(admin.ModelAdmin):
    list_display = ['id', 'default_theme', 'allow_user_customization', 'updated_at']
    
    def has_add_permission(self, request):
        # Only allow one instance
        return not GlobalThemeConfig.objects.exists()
