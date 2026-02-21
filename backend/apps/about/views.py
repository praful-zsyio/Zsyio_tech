from rest_framework import viewsets, permissions
from .models import AboutModel
from .serializers import AboutSerializer

class AboutViewSet(viewsets.ModelViewSet):
    queryset = AboutModel.objects.all().order_by('-created_at')
    serializer_class = AboutSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = []
