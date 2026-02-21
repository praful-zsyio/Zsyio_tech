from django.urls import path
from .views import AboutViewSet

list_view   = AboutViewSet.as_view({'get': 'list',     'post': 'create'})
detail_view = AboutViewSet.as_view({'get': 'retrieve', 'put': 'update',
                                    'patch': 'partial_update', 'delete': 'destroy'})

urlpatterns = [
    path('',      list_view,        name='about-list'),
    path('<str:pk>/', detail_view,  name='about-detail'),
]
