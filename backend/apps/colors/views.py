from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import ColorPalette, ColorScheme, CustomColor, GradientPreset
from .serializers import ColorPaletteSerializer, ColorSchemeSerializer, CustomColorSerializer, GradientPresetSerializer

class ColorPaletteViewSet(viewsets.ModelViewSet):
    queryset = ColorPalette.objects.all()
    serializer_class = ColorPaletteSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['get'])
    def active(self, request):
        active_palettes = self.queryset.filter(is_active=True)
        return Response(self.get_serializer(active_palettes, many=True).data)

    @action(detail=False, methods=['get'])
    def default(self, request):
        palette = self.queryset.filter(is_default=True).first()
        if not palette: return Response({"message": "No default palette"}, status=404)
        return Response(self.get_serializer(palette).data)

class ColorSchemeViewSet(viewsets.ModelViewSet):
    queryset = ColorScheme.objects.all()
    serializer_class = ColorSchemeSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['get'])
    def by_theme(self, request):
        theme_type = request.query_params.get('type', 'light')
        schemes = self.queryset.filter(theme_type=theme_type, is_active=True)
        return Response({
            "success": True, 
            "theme_type": theme_type, 
            "data": self.get_serializer(schemes, many=True).data
        })

class CustomColorViewSet(viewsets.ModelViewSet):
    queryset = CustomColor.objects.all()
    serializer_class = CustomColorSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['get'])
    def css_variables(self, request):
        colors = self.queryset.filter(is_active=True)
        css_vars = {c.css_variable: {"value": c.color_value} for c in colors}
        return Response({"success": True, "css_variables": css_vars})

class GradientPresetViewSet(viewsets.ModelViewSet):
    queryset = GradientPreset.objects.all()
    serializer_class = GradientPresetSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['get'])
    def active(self, request):
        active_presets = self.queryset.filter(is_active=True)
        return Response(self.get_serializer(active_presets, many=True).data)
