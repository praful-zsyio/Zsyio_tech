from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    summary = models.TextField(help_text="Short summary for cards")
    description = models.TextField(help_text="Full project description")
    
    # Image storage via Cloudinary (configured in settings.py)
    image = models.ImageField(upload_to='projects/', blank=True, null=True, help_text="Main project image")
    
    # Tech Stack & Tags
    tech_stack = models.JSONField(default=list, help_text="List of technologies used (e.g. ['React', 'Django'])")
    tags = models.JSONField(default=list, help_text="List of tags (e.g. ['Featured', 'Web'])")
    
    # Links
    live_url = models.URLField(blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)
    
    # Additional Details for "Full View"
    client = models.CharField(max_length=255, blank=True, null=True)
    duration = models.CharField(max_length=100, blank=True, null=True, help_text="e.g. '3 Months'")
    completion_date = models.DateField(blank=True, null=True)
    
    role = models.CharField(max_length=255, blank=True, null=True, help_text="e.g. 'Full Stack Development'")
    
    # JSON list of features
    features = models.JSONField(default=list, blank=True, help_text="List of key features")
    
    challenges = models.TextField(blank=True, null=True)
    solutions = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
