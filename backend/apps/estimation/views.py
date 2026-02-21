from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from apps.utils.mongo import mongo_log

# Hardcoded defaults as fallback
DEFAULT_INPUTS = {
  "web-designing": {
    "pages": 1,
    "iterations": 1,
    "logo": False,
  },
  "web-development": {
    "pages": 1,
    "features": {
      "cms": False,
      "auth": False,
      "payments": False,
    },
  },
  "deployment": {
    "environments": 1,
  },
  "company-details": {
    "pages": 1,
  },
  "hosting": {
    "years": 1,
  },
  "app-development": {
    "screens": 5,
    "platform": "single",
  },
  "logo-designing": {
    "concepts": 1,
    "revisions": 2,
  },
  "data-solutions": {
    "dashboards": 1,
    "integrations": 0,
  },
}

class EstimateRulesView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        # Try to fetch from MongoDB if available
        if hasattr(settings, 'MONGO_CLIENT') and settings.MONGO_CLIENT:
            try:
                db = settings.MONGO_CLIENT['zsyio_db']
                collection = db['estimation_rules']
                # Assuming one document or list of documents. Let's fetch the first config doc.
                rules_doc = collection.find_one({"type": "defaults"})
                if rules_doc:
                    # Remove _id
                    rules_doc.pop('_id', None)
                    return Response(rules_doc.get('data', DEFAULT_INPUTS))
            except Exception as e:
                print(f"MongoDB Read Error: {e}")
        
        # Fallback
        return Response(DEFAULT_INPUTS)

class EstimateView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        service_id = request.data.get('serviceId')
        params = request.data.get('params', {})

        if not service_id:
            return Response({"error": "Service ID required"}, status=status.HTTP_400_BAD_REQUEST)

        result = self.calculate_cost(service_id, params)

        mongo_log('estimations', {
            'service_id': service_id,
            'params': params,
            'estimated_cost': result['total'],
        })

        return Response({"estimatedCost": result['total'], "breakdown": result['breakdown']})

    def calculate_cost(self, service_id, params):
        breakdown = []
        cost = 0
        
        # Helper to add cost
        def add(label, amount):
            nonlocal cost
            if amount > 0:
                cost += amount
                breakdown.append({"label": label, "value": amount})

        pages = int(params.get('pages', 1))

        if service_id == "web-designing":
            iterations = int(params.get('iterations', 1))
            logo = params.get('logo', False)
            add("Base Price", 15000)
            add(f"Pages ({pages})", pages * 2000)
            add(f"Extra Iterations ({max(1, iterations - 1) - 1 if iterations > 1 else 0})", max(0, iterations - 2) * 5000) # Logic in original was max(1, iterations - 1) * 5000 -> wait, original was (max(1, iterations - 1) * 5000)? No, let's check original logic.
            # Original: 15000 + (pages * 2000) + (max(1, iterations - 1) * 5000) + (6000 if logo else 0)
            # Actually original logic seems slightly odd: max(1, iterations-1). if iterations=1, max(1,0)=1 * 5000. So 1 iteration costs 5000 extra? Maybe base includes 1?
            # Let's stick to EXACT original math but break it down.
            
            # Original: cost = 15000 + (pages * 2000) + (max(1, iterations - 1) * 5000) + (6000 if logo else 0)
            
            # Re-implementing exact math:
            add("Base Design Package", 15000)
            add(f"Additional Pages ({pages})", pages * 2000)
            
            # Iterations part
            iter_cost = max(1, iterations - 1) * 5000
            add(f"Design Iterations", iter_cost)
            
            if logo:
                add("Logo Design", 6000)
        
        elif service_id == "web-development":
            features = params.get('features', {})
            add("Base Development", 50000)
            add(f"Pages Implementation ({pages})", pages * 5000)
            if features.get('cms'): add("CMS Integration", 15000)
            if features.get('auth'): add("Authentication System", 14000)
            if features.get('payments'): add("Payment Gateway", 20000)

        elif service_id == "deployment":
            environments = int(params.get('environments', 1))
            add("Base Setup", 5000)
            add(f"Environments ({environments})", environments * 2500)

        elif service_id == "company-details":
            add("Base Package", 4000)
            add(f"Pages Content ({pages})", pages * 1500)

        elif service_id == "hosting":
            years = int(params.get('years', 1))
            add(f"Hosting ({years} years)", 5000 * years)

        elif service_id == "app-development":
            screens = int(params.get('screens', 5))
            platform = params.get('platform', 'single')
            add("Base App Development", 50000)
            add(f"Screens ({screens})", screens * 4000)
            if platform == 'both':
                add("Dual Platform (iOS + Android)", 12000)
        
        elif service_id == "logo-designing":
            concepts = int(params.get('concepts', 1))
            revisions = int(params.get('revisions', 2))
            add("Base Logo Package", 6000)
            add(f"Concepts ({concepts})", concepts * 2000)
            extra_revs = max(0, revisions - 2)
            if extra_revs > 0:
                add(f"Extra Revisions ({extra_revs})", extra_revs * 1500)

        elif service_id == "data-solutions":
            dashboards = int(params.get('dashboards', 1))
            integrations = int(params.get('integrations', 0))
            add("Base Data Setup", 18000)
            add(f"Dashboards ({dashboards})", dashboards * 5000)
            add(f"Integrations ({integrations})", integrations * 4000)

        return {"total": cost, "breakdown": breakdown}
