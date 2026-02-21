from rest_framework import generics, status, permissions
from rest_framework.response import Response
from .serializers import ContactSubmissionSerializer
from django.conf import settings
import resend
import os
import datetime
from apps.utils.mongo import get_mongo_db, mongo_log

class ContactSubmissionView(generics.CreateAPIView):
    serializer_class = ContactSubmissionSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        # Validate data without saving to ORM
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        data = serializer.validated_data
        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone', '')
        message = data.get('message')
        
        # Log to MongoDB
        submission_id = 'pending'
        mongo_success = mongo_log('contact_submissions', {
            'type': 'contact_submission',
            'name': name,
            'email': email,
            'phone': phone,
            'message': message,
            'created_at': datetime.datetime.utcnow()
        })
        
        # Email logic
        try:
            resend.api_key = getattr(settings, 'RESEND_API_KEY', os.getenv("RESEND_API_KEY"))
            from_email = getattr(settings, 'RESEND_FROM_EMAIL', "onboarding@resend.dev") or "onboarding@resend.dev"
            admin_email_to = getattr(settings, 'RESEND_ADMIN_EMAIL', "contact@zsyio.com") or "contact@zsyio.com"
            
            # Admin Notification
            try:
                resend.Emails.send({
                    "from": f"Zsyio Contact <{from_email}>",
                    "to": [admin_email_to],
                    "subject": f"New Contact Form Submission from {name}",
                    "html": f"<p><strong>Name:</strong> {name}<br><strong>Email:</strong> {email}<br><strong>Message:</strong> {message}</p>",
                    "reply_to": email,
                })
            except Exception as e:
                print(f"Error sending admin email: {str(e)}")

            # User Auto-Reply
            try:
                resend.Emails.send({
                    "from": f"Zsyio Team <{from_email}>",
                    "to": [email],
                    "subject": "We received your message - Zsyio",
                    "html": f"<p>Hi {name},</p><p>We have received your message and will get back to you shortly.</p>",
                })
            except Exception as e:
                print(f"Error sending user auto-reply: {str(e)}")
                
        except Exception as e:
            print(f"Critical error in contact email logic: {str(e)}")

        return Response({"status": "success", "message": "Message sent successfully"}, status=status.HTTP_201_CREATED)
