from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework.response import Response
from rest_framework import status
from .serializers import AllowedEmailTokenObtainPairSerializer
class CustomTokenObtainPairView(TokenObtainPairView):
    """JWT token view that only allows specific email addresses to obtain a token."""
    serializer_class = AllowedEmailTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

class CustomTokenRefreshView(TokenRefreshView):
    """Custom token refresh view with improved error handling."""
    
    def post(self, request, *args, **kwargs):
        # Check if refresh token is provided
        if not request.data or 'refresh' not in request.data:
            return Response(
                {
                    "detail": "Refresh token is required.",
                    "error": "Please provide a valid refresh token in the request body.",
                    "example": {
                        "refresh": "your_refresh_token_here"
                    }
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if refresh token is empty
        if not request.data.get('refresh'):
            return Response(
                {
                    "detail": "Refresh token cannot be empty.",
                    "error": "Please provide a valid refresh token."
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            # Call the parent class method to handle the refresh
            return super().post(request, *args, **kwargs)
        except Exception as e:
            # Handle invalid or expired tokens
            return Response(
                {
                    "detail": "Invalid or expired refresh token.",
                    "error": str(e) if str(e) else "The refresh token is not valid or has expired. Please login again."
                },
                status=status.HTTP_401_UNAUTHORIZED
            )
