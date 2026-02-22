from rest_framework.views import APIView
from django.conf import settings
from rest_framework.response import Response
from .serializers import SiteConfigSerializer, PrivacyConsentSerializer
from .models import SiteConfig, PrivacyConsent
from rest_framework import status
from apps.utils.mongo import get_mongo_db, mongo_log
from bson.objectid import ObjectId
import datetime

# Default Palette (Fallback)
DEFAULT_PALETTE = {
  "light": {
      "rosewater": "11 59% 67%",
      "flamingo": "0 60% 67%",
      "pink": "316 73% 69%",
      "mauve": "266 85% 68%",
      "red": "347 82% 67%",
      "maroon": "355 56% 52%",
      "peach": "22 87% 68%",
      "yellow": "41 86% 67%",
      "green": "109 57% 73%",
      "teal": "174 40% 65%",
      "sky": "197 100% 77%",
      "sapphire": "199 77% 74%",
      "blue": "217 92% 76%",
      "lavender": "259 72% 83%",
      "text": "234 16% 15%",
      "subtext1": "233 13% 27%",
      "subtext0": "233 12% 35%",
      "overlay2": "233 14% 43%",
      "overlay1": "233 12% 50%",
      "overlay0": "233 11% 57%",
      "surface2": "233 14% 82%",
      "surface1": "233 14% 88%",
      "surface0": "233 13% 92%",
      "base": "240 21% 97%",
      "mantle": "240 21% 99%",
      "crust": "240 23% 100%",
  },
  "dark": {
      "rosewater": "11 59% 67%",
      "flamingo": "0 60% 67%",
      "pink": "316 73% 69%",
      "mauve": "266 85% 68%",
      "red": "347 82% 67%",
      "maroon": "355 56% 52%",
      "peach": "22 87% 68%",
      "yellow": "41 86% 67%",
      "green": "109 57% 73%",
      "teal": "174 40% 65%",
      "sky": "197 100% 77%",
      "sapphire": "199 77% 74%",
      "blue": "217 92% 76%",
      "lavender": "259 72% 83%",
      "text": "234 16% 92%",
      "subtext1": "233 13% 83%",
      "subtext0": "233 12% 75%",
      "overlay2": "233 14% 67%",
      "overlay1": "233 12% 60%",
      "overlay0": "233 11% 53%",
      "surface2": "233 14% 37%",
      "surface1": "233 14% 30%",
      "surface0": "233 13% 23%",
      "base": "240 21% 15%",
      "mantle": "240 21% 12%",
      "crust": "240 23% 10%",
  }
}

class ConfigView(APIView):
    def get(self, request):
        db = get_mongo_db()
        config = None
        if db is not None:
            config = db['site_config'].find_one()
        
        if not config:
            config = {
                "site_name": "Zsyio",
                "site_tagline": "Innovative Digital Solutions",
                "contact_email": "contact@zsyio.com"
            }
            if db is not None:
                db['site_config'].insert_one(config)
        
        if '_id' in config:
            config['id'] = str(config.pop('_id'))
        
        config['theme_colors'] = DEFAULT_PALETTE
        return Response(config)

class GlobalDataView(APIView):
    def get(self, request):
        data = {
            "navLinks": [
                {"title": "Home", "path": "/", "icon": "Home"},
                {"title": "About Us", "path": "/about", "icon": "Info"},
                {"title": "Services", "path": "/services", "icon": "Cpu"},
                {"title": "Projects", "path": "/projects", "icon": "Briefcase"},
                
                {"title": "Contact", "path": "/contact", "icon": "Mail"},
            ],
            "aboutData": {
                "stats": {
                    "studio": [
                        {"value": "50+", "label": "Projects Delivered"},
                        {"value": "30+", "label": "Happy Clients"},
                        {"value": "5+", "label": "Years Experience"},
                        {"value": "15+", "label": "Team Members"},
                    ],
                    "meta": [
                        {"value": "99%", "label": "Client Satisfaction"},
                        {"value": "24/7", "label": "Support Available"},
                        {"value": "100%", "label": "On-Time Delivery"},
                    ]
                },
                "testimonials": [
                    {
                        "quote": "Zsyio delivered an exceptional product that exceeded our expectations.",
                        "name": "John Doe",
                        "role": "CEO, Tech Corp"
                    }
                ],
                "techStack": [
                    {"title": "Frontend", "items": ["React", "Vue.js", "Next.js"]},
                    {"title": "Backend", "items": ["Node.js", "Python", "Django"]}
                ],
                "whyPartner": {
                    "reasons": [
                        {"title": "Expert Team", "description": "Our team consists of experienced developers dedicated to your success."}
                    ],
                    "tags": ["Innovation", "Quality", "Reliability"]
                }
            }
        }
        return Response(data)

class PrivacyConsentView(APIView):
    def post(self, request):
        status_val = request.data.get('status')
        if status_val not in ['accepted', 'rejected']:
            return Response({'error': 'Invalid status.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Get IP address
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        ip = x_forwarded_for.split(',')[0] if x_forwarded_for else request.META.get('REMOTE_ADDR')
            
        mongo_log('privacy_consents', {
            'ip_address': ip,
            'status': status_val,
            'user_id': str(request.user.id) if request.user.is_authenticated else 'anonymous',
            'timestamp': datetime.datetime.utcnow()
        })

        return Response({'status': 'saved', 'ip': ip}, status=status.HTTP_201_CREATED)
