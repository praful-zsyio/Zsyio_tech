"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from apps.authentication.views import CustomTokenObtainPairView, CustomTokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('api/login/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    # Keep old endpoints for backward compatibility
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh_old'),
    path('api/projects/', include('apps.projects.urls')),
    path('api/projects', include('apps.projects.urls')),
    path('api/services/', include('apps.services.urls')),
    path('api/cart/', include('apps.cart.urls')),
    path('api/cart', include('apps.cart.urls')),
    path('api/about/', include('apps.about.urls')),
    path('api/estimation/', include('apps.estimation.urls')),
    path('api/chatbot/', include('apps.chatbot.urls')),
    path('api/config/', include('apps.config_api.urls')),
    path('api/contact/', include('apps.contact.urls')),
    path('api/cloudinary/', include('apps.cloudinary_upload.urls')),
    path('api/theme/', include('apps.theme.urls')),
    path('api/colors/', include('apps.colors.urls')),
    path('api/newsletter/', include('apps.newsletter.urls')),
    path('api/newsletter', include('apps.newsletter.urls')),
]
