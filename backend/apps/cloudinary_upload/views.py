from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
import cloudinary.uploader
import os


class CloudinaryUploadView(APIView):
    """
    API endpoint for uploading images and videos to Cloudinary.
    Supports both image and video file types.
    """
    permission_classes = [AllowAny]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        """
        Upload a file to Cloudinary.
        
        Request body (multipart/form-data):
        - file: The image or video file to upload
        - folder: (optional) Cloudinary folder path (default: 'uploads')
        - resource_type: (optional) 'image' or 'video' (auto-detected if not provided)
        
        Returns:
        - url: Public URL of the uploaded file
        - secure_url: HTTPS URL of the uploaded file
        - public_id: Cloudinary public ID
        - format: File format
        - resource_type: Type of resource (image/video)
        """
        
        file = request.FILES.get('file')
        if not file:
            return Response({
                "error": "No file provided",
                "hint": "Please include a 'file' field in your multipart/form-data request"
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Get optional parameters
        folder = request.data.get('folder', 'uploads')
        resource_type = request.data.get('resource_type', 'auto')
        
        try:
            # Upload to Cloudinary
            upload_result = cloudinary.uploader.upload(
                file,
                folder=folder,
                resource_type=resource_type
            )
            
            return Response({
                "success": True,
                "message": "File uploaded successfully",
                "data": {
                    "url": upload_result.get('url'),
                    "secure_url": upload_result.get('secure_url'),
                    "public_id": upload_result.get('public_id'),
                    "format": upload_result.get('format'),
                    "resource_type": upload_result.get('resource_type'),
                    "width": upload_result.get('width'),
                    "height": upload_result.get('height'),
                    "bytes": upload_result.get('bytes'),
                    "created_at": upload_result.get('created_at')
                }
            }, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            return Response({
                "error": "Upload failed",
                "message": str(e),
                "hint": "Please check your Cloudinary configuration in settings.py"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CloudinaryDeleteView(APIView):
    """
    API endpoint for deleting files from Cloudinary.
    """
    permission_classes = [AllowAny]

    def delete(self, request):
        """
        Delete a file from Cloudinary.
        
        Request body (JSON):
        - public_id: The Cloudinary public ID of the file to delete
        - resource_type: (optional) 'image' or 'video' (default: 'image')
        
        Returns:
        - result: 'ok' if successful
        """
        
        public_id = request.data.get('public_id')
        if not public_id:
            return Response({
                "error": "No public_id provided",
                "hint": "Please include a 'public_id' field in your request body"
            }, status=status.HTTP_400_BAD_REQUEST)
        
        resource_type = request.data.get('resource_type', 'image')
        
        try:
            # Delete from Cloudinary
            delete_result = cloudinary.uploader.destroy(
                public_id,
                resource_type=resource_type
            )
            
            if delete_result.get('result') == 'ok':
                return Response({
                    "success": True,
                    "message": "File deleted successfully",
                    "public_id": public_id
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    "error": "Delete failed",
                    "message": "File not found or already deleted",
                    "result": delete_result
                }, status=status.HTTP_404_NOT_FOUND)
                
        except Exception as e:
            return Response({
                "error": "Delete failed",
                "message": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
