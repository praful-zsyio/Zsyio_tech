from django.db import models

class Service(models.Model):
    slug = models.SlugField(unique=True, max_length=100)
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=50, help_text="Lucide icon name")
    icon_image = models.ImageField(upload_to='service_icons/', blank=True, null=True, help_text="Upload custom icon image")
    gradient = models.CharField(max_length=100, help_text="Tailwind gradient classes")
    base_rate = models.DecimalField(max_digits=10, decimal_places=2)
    hourly_rate = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.title

class Technology(models.Model):
    CATEGORY_CHOICES = [
        ('Frontend', 'Frontend'),
        ('Backend', 'Backend'),
        ('Databases', 'Databases'),
        ('Cloud Solutions', 'Cloud Solutions'),
        ('DevOps', 'DevOps'),
        ('Mobile', 'Mobile'),
        ('Other', 'Other'),
    ]
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=50, help_text="Lucide icon name")
    icon_image = models.ImageField(upload_to='tech_icons/', blank=True, null=True, help_text="Upload custom icon image")
    color = models.CharField(max_length=20, help_text="Hex color code")
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Technologies"
