from django.contrib import admin
from .models import Service, Technology

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'icon', 'icon_image', 'base_rate', 'hourly_rate')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title', 'description')

@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'icon', 'icon_image')
    list_filter = ('category',)
    search_fields = ('name',)
