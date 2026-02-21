from django.db import models
from django.contrib.auth.models import User

class SiteConfig(models.Model):
    site_name = models.CharField(max_length=255, default="Company Name")
    contact_email = models.EmailField(default="contact@example.com")
    logo = models.ImageField(upload_to='config/', blank=True, null=True)
    
    class Meta:
        verbose_name = "Site Configuration"
        verbose_name_plural = "Site Configuration"

    def __str__(self):
        return self.site_name

    def save(self, *args, **kwargs):
        # Singleton pattern: ensure only one instance exists
        if not self.pk and SiteConfig.objects.exists():
            return
        return super().save(*args, **kwargs)

class PrivacyConsent(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=[('accepted', 'Accepted'), ('rejected', 'Rejected')])
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.status}"

