from django.urls import path
from .views import ServiceViewSet, TechnologyViewSet

service_list = ServiceViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

service_detail = ServiceViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

technology_list = TechnologyViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

technology_detail = TechnologyViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

technology_categorized = TechnologyViewSet.as_view({
    'get': 'categorized'
})

urlpatterns = [
    # Technologies URLs
    # Place specific non-param routes first
    path('technologies/categorized/', technology_categorized, name='technology-categorized'),
    # Root combined view
    path('', ServiceViewSet.as_view({'get': 'combined_list'}), name='services-root'),
    
    path('technologies/', technology_list, name='technology-list-create'),
    
    # Allow string identifier for flexible lookup (ID or Name)
    path('technologies/<str:identifier>/', technology_detail, name='technology-detail-delete'),

    # Services URLs
    path('services/', service_list, name='service-list-create'),
    path('services/<str:slug>/', service_detail, name='service-detail-delete'),
    
    # Root endpoint fallback
    path('<str:slug>/', service_detail, name='service-detail-root'),
]
