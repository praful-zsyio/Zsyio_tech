from django.urls import path
from .views import EstimateView, EstimateRulesView

urlpatterns = [
    path('calculate/', EstimateView.as_view(), name='calculate_estimate'),
    path('rules/', EstimateRulesView.as_view(), name='estimate_rules'),
]
