from django.urls import path
from .views import UserThemeView, GlobalThemeView

urlpatterns = [
    path('user/', UserThemeView.as_view(), name='user-theme'),
    path('global/', GlobalThemeView.as_view(), name='global-theme'),
]
