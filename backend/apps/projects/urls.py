from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, ProjectCreateView, ProjectDeleteView

router = DefaultRouter()
router.register(r'', ProjectViewSet)

urlpatterns = [
    path('create/', ProjectCreateView.as_view(), name='project-create'),
    path('delete/<str:pk>/', ProjectDeleteView.as_view(), name='project-delete'),
    path('delete/<str:pk>', ProjectDeleteView.as_view(), name='project-delete-no-slash'),
    path('', include(router.urls)),
]
