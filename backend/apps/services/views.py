from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Service, Technology
from .serializers import ServiceSerializer, TechnologySerializer

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'

    @action(detail=False, methods=['get'])
    def combined_list(self, request):
        services = Service.objects.all()
        techs = Technology.objects.all()
        
        return Response({
            "services": ServiceSerializer(services, many=True).data,
            "technologies": TechnologySerializer(techs, many=True).data
        })

class TechnologyViewSet(viewsets.ModelViewSet):
    queryset = Technology.objects.all()
    serializer_class = TechnologySerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'id'

    @action(detail=False, methods=['get'])
    def categorized(self, request):
        techs = Technology.objects.all()
        
        grouped_data = {}
        for tech in techs:
            category = tech.category if hasattr(tech, 'category') else 'Uncategorized'
            if category not in grouped_data:
                grouped_data[category] = []
            grouped_data[category].append(TechnologySerializer(tech).data)

        result = [{"category": category, "items": items} for category, items in grouped_data.items()]
        return Response(result)
