from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Service, Technology
from .serializers import ServiceSerializer, TechnologySerializer
from apps.utils.mongo import get_mongo_db, mongo_log
from bson.objectid import ObjectId
import datetime

def get_collection(name):
    db = get_mongo_db()
    return db[name] if db is not None else None

def serialize_mongo_doc(doc):
    """Recursively convert MongoDB ObjectId and datetime to JSON serializable formats."""
    if doc is None:
        return None
    if isinstance(doc, list):
        return [serialize_mongo_doc(item) for item in doc]
    if isinstance(doc, dict):
        new_doc = {}
        for k, v in doc.items():
            if k == '_id':
                new_doc['id'] = str(v)
            elif isinstance(v, (ObjectId, datetime.datetime)):
                if isinstance(v, datetime.datetime):
                    new_doc[k] = v.isoformat()
                else:
                    new_doc[k] = str(v)
            elif isinstance(v, (list, dict)):
                new_doc[k] = serialize_mongo_doc(v)
            else:
                new_doc[k] = v
        return new_doc
    return doc

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.none()
    serializer_class = ServiceSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'

    def list(self, request, *args, **kwargs):
        coll = get_collection('services')
        if coll is None: return Response([])
        services = [serialize_mongo_doc(s) for s in coll.find()]
        return Response(services)

    @action(detail=False, methods=['get'])
    def combined_list(self, request):
        db = get_mongo_db()
        if not db: return Response({"services": [], "technologies": []})
        
        services = [serialize_mongo_doc(s) for s in db['services'].find()]
        techs = [serialize_mongo_doc(t) for t in db['technologies'].find()]
        
        return Response({
            "services": services,
            "technologies": techs
        })

    def retrieve(self, request, slug=None, *args, **kwargs):
        coll = get_collection('services')
        if coll is None: return Response({"detail": "Not found."}, status=404)
        # Try lookup by slug or ID
        query = {"slug": slug}
        if ObjectId.is_valid(slug):
            query = {"$or": [{"slug": slug}, {"_id": ObjectId(slug)}]}
        
        service = coll.find_one(query)
        if not service:
            return Response({"detail": "Service not found."}, status=404)
        return Response(serialize_mongo_doc(service))

    def create(self, request, *args, **kwargs):
        coll = get_collection('services')
        if coll is None: return Response({"error": "DB error"}, status=500)
        data = request.data.copy()
        data['created_at'] = datetime.datetime.utcnow()
        res = coll.insert_one(data)
        data['id'] = str(res.inserted_id)
        data.pop('_id', None)
        mongo_log('service_logs', {'action': 'create', 'service_id': data['id'], 'title': data.get('title')})
        return Response(serialize_mongo_doc(data), status=201)

    def update(self, request, slug=None, *args, **kwargs):
        coll = get_collection('services')
        if coll is None: return Response(status=500)
        query = {"slug": slug}
        if ObjectId.is_valid(slug):
            query = {"$or": [{"slug": slug}, {"_id": ObjectId(slug)}]}
            
        data = request.data.copy()
        data.pop('id', None)
        data.pop('_id', None)
        coll.update_one(query, {"$set": data})
        service = coll.find_one(query)
        if not service: return Response({"detail": "Not found."}, status=404)
        mongo_log('service_logs', {'action': 'update', 'service_id': str(service['_id']), 'title': service.get('title')})
        return Response(serialize_mongo_doc(service))

    def partial_update(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def destroy(self, request, slug=None, *args, **kwargs):
        coll = get_collection('services')
        if coll is None: return Response(status=500)
        query = {"slug": slug}
        if ObjectId.is_valid(slug):
            query = {"$or": [{"slug": slug}, {"_id": ObjectId(slug)}]}
            
        service = coll.find_one(query)
        if not service: return Response({"detail": "Not found."}, status=404)
        coll.delete_one(query)
        mongo_log('service_logs', {'action': 'delete', 'service_id': str(service['_id']), 'title': service.get('title')})
        return Response(status=204)

class TechnologyViewSet(viewsets.ModelViewSet):
    queryset = Technology.objects.none()
    serializer_class = TechnologySerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'identifier'

    def list(self, request, *args, **kwargs):
        coll = get_collection('technologies')
        if coll is None: return Response([])
        techs = [serialize_mongo_doc(t) for t in coll.find()]
        return Response(techs)

    def retrieve(self, request, identifier=None, *args, **kwargs):
        coll = get_collection('technologies')
        if coll is None: return Response({"detail": "Not found."}, status=404)
        
        # Support ID (ObjectId or str) or Name
        query = {"$or": [{"name": identifier}]}
        if ObjectId.is_valid(identifier):
            query["$or"].append({"_id": ObjectId(identifier)})
        elif identifier.isdigit():
            # Support integer IDs if they exist as strings or numbers in Mongo
            query["$or"].append({"_id": identifier})
            try: query["$or"].append({"_id": int(identifier)})
            except: pass
            
        tech = coll.find_one(query)
        if not tech:
            return Response({"detail": "Technology not found."}, status=404)
        return Response(serialize_mongo_doc(tech))

    def create(self, request, *args, **kwargs):
        coll = get_collection('technologies')
        if coll is None: return Response({"error": "DB error"}, status=500)
        data = request.data.copy()
        res = coll.insert_one(data)
        data['id'] = str(res.inserted_id)
        data.pop('_id', None)
        mongo_log('technology_logs', {'action': 'create', 'technology_id': data['id'], 'name': data.get('name')})
        return Response(serialize_mongo_doc(data), status=201)

    def update(self, request, identifier=None, *args, **kwargs):
        coll = get_collection('technologies')
        if coll is None: return Response(status=500)
        
        query = {"$or": [{"name": identifier}]}
        if ObjectId.is_valid(identifier):
            query["$or"].append({"_id": ObjectId(identifier)})
        elif identifier.isdigit():
            query["$or"].append({"_id": identifier})
            try: query["$or"].append({"_id": int(identifier)})
            except: pass
            
        data = request.data.copy()
        data.pop('id', None)
        data.pop('_id', None)
        coll.update_one(query, {"$set": data})
        tech = coll.find_one(query)
        if not tech: return Response({"detail": "Not found."}, status=404)
        mongo_log('technology_logs', {'action': 'update', 'technology_id': str(tech['_id']), 'name': tech.get('name')})
        return Response(serialize_mongo_doc(tech))

    def partial_update(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def destroy(self, request, identifier=None, *args, **kwargs):
        coll = get_collection('technologies')
        if coll is None: return Response(status=500)
        
        query = {"$or": [{"name": identifier}]}
        if ObjectId.is_valid(identifier):
            query["$or"].append({"_id": ObjectId(identifier)})
        elif identifier.isdigit():
            query["$or"].append({"_id": identifier})
            try: query["$or"].append({"_id": int(identifier)})
            except: pass
            
        tech = coll.find_one(query)
        if not tech: return Response({"detail": "Not found."}, status=404)
        coll.delete_one(query)
        mongo_log('technology_logs', {'action': 'delete', 'technology_id': str(tech['_id']), 'name': tech.get('name')})
        return Response(status=204)

    @action(detail=False, methods=['get'])
    def categorized(self, request):
        coll = get_collection('technologies')
        if coll is None: return Response([])
        techs = [serialize_mongo_doc(t) for t in coll.find()]
        
        grouped_data = {}
        for tech in techs:
            category = tech.get('category', 'Uncategorized')
            if category not in grouped_data:
                grouped_data[category] = []
            grouped_data[category].append(tech)

        result = [{"category": category, "items": items} for category, items in grouped_data.items()]
        return Response(result)
