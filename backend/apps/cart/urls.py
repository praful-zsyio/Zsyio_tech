from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CartViewSet

router = DefaultRouter()
router.register(r'', CartViewSet, basename='cart')

urlpatterns = [
    path('add_item/', CartViewSet.as_view({'post': 'add_item'}), name='cart-add-item'),
    path('clear/', CartViewSet.as_view({'delete': 'clear'}), name='cart-clear'),
    path('', include(router.urls)),
]
