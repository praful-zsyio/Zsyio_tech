from django.db import models


class ColorPalette(models.Model):
    """
    Predefined color palettes for the website.
    Each palette contains a set of coordinated colors.
    """
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    is_default = models.BooleanField(default=False)
    
    # Primary colors
    primary = models.CharField(max_length=7, help_text="Main brand color (hex)")
    primary_light = models.CharField(max_length=7, blank=True)
    primary_dark = models.CharField(max_length=7, blank=True)
    
    # Secondary colors
    secondary = models.CharField(max_length=7, help_text="Secondary brand color (hex)")
    secondary_light = models.CharField(max_length=7, blank=True)
    secondary_dark = models.CharField(max_length=7, blank=True)
    
    # Accent colors
    accent = models.CharField(max_length=7, help_text="Accent color (hex)")
    accent_light = models.CharField(max_length=7, blank=True)
    accent_dark = models.CharField(max_length=7, blank=True)
    
    # Semantic colors
    success = models.CharField(max_length=7, default="#10b981")
    warning = models.CharField(max_length=7, default="#f59e0b")
    error = models.CharField(max_length=7, default="#ef4444")
    info = models.CharField(max_length=7, default="#3b82f6")
    
    # Neutral colors
    background = models.CharField(max_length=7, default="#ffffff")
    surface = models.CharField(max_length=7, default="#f9fafb")
    text_primary = models.CharField(max_length=7, default="#111827")
    text_secondary = models.CharField(max_length=7, default="#6b7280")
    border = models.CharField(max_length=7, default="#e5e7eb")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Color Palette"
        verbose_name_plural = "Color Palettes"
        ordering = ['-is_default', 'name']
    
    def __str__(self):
        return f"{self.name}" + (" (Default)" if self.is_default else "")
    
    def save(self, *args, **kwargs):
        # Ensure only one default palette
        if self.is_default:
            ColorPalette.objects.filter(is_default=True).update(is_default=False)
        super().save(*args, **kwargs)


class ColorScheme(models.Model):
    """
    Complete color schemes for different themes (light/dark).
    """
    THEME_CHOICES = [
        ('light', 'Light'),
        ('dark', 'Dark'),
    ]
    
    name = models.CharField(max_length=100)
    theme_type = models.CharField(max_length=10, choices=THEME_CHOICES)
    palette = models.ForeignKey(ColorPalette, on_delete=models.CASCADE, related_name='schemes')
    is_active = models.BooleanField(default=True)
    
    # Override specific colors for this scheme
    background_override = models.CharField(max_length=7, blank=True, null=True)
    surface_override = models.CharField(max_length=7, blank=True, null=True)
    text_primary_override = models.CharField(max_length=7, blank=True, null=True)
    text_secondary_override = models.CharField(max_length=7, blank=True, null=True)
    border_override = models.CharField(max_length=7, blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Color Scheme"
        verbose_name_plural = "Color Schemes"
        unique_together = ['palette', 'theme_type']
    
    def __str__(self):
        return f"{self.palette.name} - {self.theme_type.title()}"


class CustomColor(models.Model):
    """
    Custom color definitions for specific UI elements.
    Allows fine-grained control over individual component colors.
    """
    CATEGORY_CHOICES = [
        ('button', 'Button'),
        ('link', 'Link'),
        ('card', 'Card'),
        ('navbar', 'Navigation Bar'),
        ('footer', 'Footer'),
        ('form', 'Form'),
        ('badge', 'Badge'),
        ('alert', 'Alert'),
        ('other', 'Other'),
    ]
    
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    description = models.TextField(blank=True)
    
    # Color values
    color_value = models.CharField(max_length=7, help_text="Hex color code")
    hover_color = models.CharField(max_length=7, blank=True, help_text="Hover state color")
    active_color = models.CharField(max_length=7, blank=True, help_text="Active state color")
    disabled_color = models.CharField(max_length=7, blank=True, help_text="Disabled state color")
    
    # CSS variable name (for easy frontend integration)
    css_variable = models.CharField(max_length=100, unique=True, help_text="e.g., --btn-primary")
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Custom Color"
        verbose_name_plural = "Custom Colors"
        ordering = ['category', 'name']
    
    def __str__(self):
        return f"{self.name} ({self.category})"


class GradientPreset(models.Model):
    """
    Predefined gradient presets for backgrounds and UI elements.
    """
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    
    # Gradient definition
    gradient_type = models.CharField(max_length=20, default='linear', 
                                     help_text="linear, radial, conic")
    direction = models.CharField(max_length=50, default='to right',
                                 help_text="e.g., 'to right', '45deg', 'circle'")
    color_stops = models.JSONField(help_text="Array of color stops with positions")
    
    # CSS output
    css_value = models.TextField(blank=True, help_text="Generated CSS gradient value")
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Gradient Preset"
        verbose_name_plural = "Gradient Presets"
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        # Auto-generate CSS value
        if self.color_stops:
            stops = ', '.join([f"{stop['color']} {stop.get('position', '')}" 
                              for stop in self.color_stops])
            self.css_value = f"{self.gradient_type}-gradient({self.direction}, {stops})"
        super().save(*args, **kwargs)
