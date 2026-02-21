from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from .models import Project
from .serializers import ProjectSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer
    permission_classes = [permissions.AllowAny]

class ProjectCreateView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ProjectDeleteView(generics.DestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
