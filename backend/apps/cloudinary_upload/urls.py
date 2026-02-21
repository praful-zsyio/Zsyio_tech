from django.urls import path
from .views import CloudinaryUploadView, CloudinaryDeleteView

urlpatterns = [
    path('upload/', CloudinaryUploadView.as_view(), name='cloudinary-upload'),
    path('delete/', CloudinaryDeleteView.as_view(), name='cloudinary-delete'),
]
