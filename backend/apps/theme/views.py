from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .models import ThemePreference, GlobalThemeConfig

class UserThemeView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        user = request.user if request.user.is_authenticated else None
        session_id = request.session.session_key
        if not session_id and not user:
            request.session.create()
            session_id = request.session.session_key
            
        if user:
            theme_pref, _ = ThemePreference.objects.get_or_create(user=user, defaults={"theme_mode": "dark"})
        else:
            theme_pref, _ = ThemePreference.objects.get_or_create(session_id=session_id, defaults={"theme_mode": "dark"})
            
        return Response({
            "success": True,
            "data": {
                "id": theme_pref.id,
                "theme_mode": theme_pref.theme_mode,
                "primary_color": theme_pref.primary_color,
                "accent_color": theme_pref.accent_color
            },
            "is_authenticated": user is not None
        })

    def post(self, request):
        user = request.user if request.user.is_authenticated else None
        session_id = request.session.session_key or "guest"
        
        data = request.data
        if user:
            theme_pref, _ = ThemePreference.objects.get_or_create(user=user)
        else:
            theme_pref, _ = ThemePreference.objects.get_or_create(session_id=session_id)
            
        if 'theme_mode' in data: theme_pref.theme_mode = data['theme_mode']
        if 'primary_color' in data: theme_pref.primary_color = data['primary_color']
        if 'accent_color' in data: theme_pref.accent_color = data['accent_color']
        theme_pref.save()
        
        return Response({
            "success": True,
            "data": {
                "id": theme_pref.id,
                "theme_mode": theme_pref.theme_mode
            }
        })

class GlobalThemeView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        config = GlobalThemeConfig.objects.first()
        if not config:
            config = GlobalThemeConfig.objects.create()
            
        return Response({
            "success": True,
            "data": {
                "default_theme": config.default_theme,
                "allow_user_customization": config.allow_user_customization,
                "brand_primary": config.brand_primary,
                "brand_secondary": config.brand_secondary,
                "brand_accent": config.brand_accent
            }
        })

    def post(self, request):
        config = GlobalThemeConfig.objects.first()
        if not config:
            config = GlobalThemeConfig.objects.create()
        
        data = request.data
        if 'default_theme' in data: config.default_theme = data['default_theme']
        if 'allow_user_customization' in data: config.allow_user_customization = data['allow_user_customization']
        if 'brand_primary' in data: config.brand_primary = data['brand_primary']
        config.save()
        
        return Response({
            "success": True,
            "data": {"id": config.id}
        })
