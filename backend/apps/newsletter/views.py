from rest_framework import generics, status, permissions
from rest_framework.response import Response
from .serializers import NewsletterSubscriberSerializer
from django.conf import settings
import resend
import os
import datetime
from apps.utils.mongo import get_mongo_db, mongo_log
from rest_framework.decorators import action

class NewsletterSubscribeView(generics.CreateAPIView):
    """
    API view to subscribe a company page for newsletter.
    """
    serializer_class = NewsletterSubscriberSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = []
    
    def get(self, request, *args, **kwargs):
        """Standard reload/ping method for this view"""
        return Response({
            "status": "success",
            "message": "Newsletter app reloaded successfully",
            "timestamp": datetime.datetime.utcnow().isoformat(),
            "app": "newsletter"
        })

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        email = serializer.validated_data.get('email')
        
        # Save to MongoDB
        try:
            db = get_mongo_db()
            if db is not None:
                coll = db['subscribers']
                # Check if already subscribed
                if coll.find_one({"email": email}):
                    return Response({
                        "status": "error",
                        "message": "Email already subscribed"
                    }, status=status.HTTP_400_BAD_REQUEST)
                
                coll.insert_one({
                    "email": email,
                    "created_at": datetime.datetime.utcnow()
                })
                
                # Log action
                mongo_log('subscriber_logs', {
                    'action': 'subscribe',
                    'email': email,
                    'created_at': datetime.datetime.utcnow()
                })
        except Exception as e:
            print(f"Database error: {str(e)}")
            # Continue even if DB log fails as long as email goes out? 
            # Or return error if DB is critical. Usually for subscribe we want it in DB.
        
        # Send Welcome Email via Resend
        try:
            resend.api_key = getattr(settings, 'RESEND_API_KEY', os.getenv("RESEND_API_KEY"))
            from_email = getattr(settings, 'RESEND_FROM_EMAIL', "onboarding@resend.dev") or "onboarding@resend.dev"
            
            resend.Emails.send({
                "from": f"Zsyio Newsletter <{from_email}>",
                "to": [email],
                "subject": "Welcome to Zsyio Newsletter!",
                "html": f"""
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #f9f9f9;">
                        <div style="text-align: center; margin-bottom: 20px;">
                            <h1 style="color: #4A90E2; margin: 0;">Zsyio</h1>
                        </div>
                        <h2 style="color: #333; text-align: center;">Welcome to our Newsletter!</h2>
                        <p style="color: #555; line-height: 1.6;">Thank you for subscribing to the <strong>Zsyio</strong> newsletter. We are thrilled to have you with us!</p>
                        <p style="color: #555; line-height: 1.6;">You'll be the first to receive updates on our latest projects, industry insights, and special announcements.</p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="https://zsyio.com" style="background-color: #4A90E2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Visit Our Website</a>
                        </div>
                        <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;">
                        <p style="font-size: 12px; color: #999; text-align: center;">You received this email because you subscribed on our website. <br> If you did not sign up for this newsletter, please ignore this email.</p>
                        <p style="font-size: 12px; color: #999; text-align: center;">&copy; {datetime.datetime.now().year} Zsyio. All rights reserved.</p>
                    </div>
                """,
            })
        except Exception as e:
            print(f"Error sending welcome email: {str(e)}")

        return Response({
            "status": "success", 
            "message": "Subscribed successfully",
            "email": email
        }, status=status.HTTP_201_CREATED)
