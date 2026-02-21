from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ColorPaletteViewSet,
    ColorSchemeViewSet,
    CustomColorViewSet,
    GradientPresetViewSet
)

router = DefaultRouter()
router.register(r'palettes', ColorPaletteViewSet, basename='color-palette')
router.register(r'schemes', ColorSchemeViewSet, basename='color-scheme')
router.register(r'custom', CustomColorViewSet, basename='custom-color')
router.register(r'gradients', GradientPresetViewSet, basename='gradient-preset')

urlpatterns = [
    path('', include(router.urls)),
]
