from django.urls import path
from .views import ConfigView, PrivacyConsentView, GlobalDataView

urlpatterns = [
    path('', ConfigView.as_view(), name='site-config'),
    path('privacy-consent/', PrivacyConsentView.as_view(), name='privacy-consent'),
    path('global-data/', GlobalDataView.as_view(), name='global-data'),
]
