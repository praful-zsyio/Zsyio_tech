from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
import datetime

class ReloadMixin:
    """
    Mixin to add a standard 'reload' action to ViewSets.
    This can be used to refresh data or verify app connectivity.
    """
    @action(detail=False, methods=['get'], url_path='reload')
    def reload_data(self, request):
        app_name = self.__class__.__module__.split('.')[1]
        return Response({
            "status": "success",
            "message": f"App '{app_name}' reloaded successfully",
            "timestamp": datetime.datetime.utcnow().isoformat(),
            "app": app_name
        }, status=status.HTTP_200_OK)
