from django.db import models
from django.contrib.auth.models import User


class ThemePreference(models.Model):
    """
    Store theme preferences for users or globally.
    Can be used for authenticated users or anonymous sessions.
    """
    THEME_CHOICES = [
        ('light', 'Light'),
        ('dark', 'Dark'),
        ('auto', 'Auto (System)'),
    ]
    
    # User can be null for anonymous/global preferences
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True, related_name='theme_preference')
    
    # Session ID for anonymous users
    session_id = models.CharField(max_length=255, null=True, blank=True, unique=True)
    
    # Theme settings
    theme_mode = models.CharField(max_length=10, choices=THEME_CHOICES, default='dark')
    
    # Custom color scheme (optional, for future expansion)
    primary_color = models.CharField(max_length=7, default='#3b82f6', help_text="Hex color code")
    accent_color = models.CharField(max_length=7, default='#8b5cf6', help_text="Hex color code")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Theme Preference"
        verbose_name_plural = "Theme Preferences"
    
    def __str__(self):
        if self.user:
            return f"{self.user.username}'s theme: {self.theme_mode}"
        return f"Anonymous ({self.session_id}): {self.theme_mode}"


class GlobalThemeConfig(models.Model):
    """
    Global theme configuration for the entire site.
    Only one instance should exist.
    """
    # Default theme for new users
    default_theme = models.CharField(max_length=10, choices=ThemePreference.THEME_CHOICES, default='dark')
    
    # Allow users to change theme
    allow_user_customization = models.BooleanField(default=True)
    
    # Brand colors
    brand_primary = models.CharField(max_length=7, default='#3b82f6')
    brand_secondary = models.CharField(max_length=7, default='#8b5cf6')
    brand_accent = models.CharField(max_length=7, default='#ec4899')
    
    # Updated timestamp
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Global Theme Configuration"
        verbose_name_plural = "Global Theme Configuration"
    
    def __str__(self):
        return f"Global Theme Config (Default: {self.default_theme})"
    
    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        if not self.pk and GlobalThemeConfig.objects.exists():
            raise ValueError("Only one GlobalThemeConfig instance is allowed")
        return super().save(*args, **kwargs)
