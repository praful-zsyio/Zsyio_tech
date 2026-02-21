from django.db import models

# Create your models here.
class AboutModel(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='about/', blank=True, null=True)
    tech_stack = models.JSONField(default=list, blank=True)
    tags = models.JSONField(default=list, blank=True)
    live_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)    
    
    def __str__(self):
        return self.title        