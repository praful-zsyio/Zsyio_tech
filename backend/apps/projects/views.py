from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from django.conf import settings
from .models import Project
from .serializers import ProjectSerializer
from apps.utils.mongo import get_mongo_db, mongo_log
from apps.utils.views import ReloadMixin
from bson.objectid import ObjectId
import datetime

def get_projects_collection():
    db = get_mongo_db()
    return db['projects'] if db is not None else None

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

class ProjectViewSet(ReloadMixin, viewsets.ModelViewSet):
    queryset = Project.objects.none()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.AllowAny]
    
    def list(self, request, *args, **kwargs):
        coll = get_projects_collection()
        if coll is None: return Response([])
        projects = [serialize_mongo_doc(p) for p in coll.find().sort('created_at', -1)]
        return Response(projects)

    def retrieve(self, request, pk=None, *args, **kwargs):
        coll = get_projects_collection()
        if coll is None: return Response({"detail": "Not found."}, status=404)
        try:
            # Handle both ObjectId and potential string IDs
            query = {"_id": ObjectId(pk)} if ObjectId.is_valid(pk) else {"_id": pk}
            project = coll.find_one(query)
            if not project:
                return Response({"detail": "No project found with this ID."}, status=404)
            return Response(serialize_mongo_doc(project))
        except Exception as e:
            return Response({"detail": f"Error retrieving project: {str(e)}"}, status=400)

    def create(self, request, *args, **kwargs):
        coll = get_projects_collection()
        if coll is None: return Response({"error": "Database connection error"}, status=500)
        
        data = request.data.copy()
        data['created_at'] = datetime.datetime.utcnow()
        
        res = coll.insert_one(data)
        data['id'] = str(res.inserted_id)
        data.pop('_id', None)
        
        mongo_log('project_logs', {
            'action': 'create',
            'project_id': data['id'],
            'title': data.get('title'),
        })
        return Response(serialize_mongo_doc(data), status=201)

    def update(self, request, pk=None, *args, **kwargs):
        coll = get_projects_collection()
        if coll is None: return Response({"error": "Database error"}, status=500)
        
        query = {"_id": ObjectId(pk)} if ObjectId.is_valid(pk) else {"_id": pk}
        data = request.data.copy()
        data.pop('id', None)
        data.pop('_id', None)
        
        coll.update_one(query, {"$set": data})
        project = coll.find_one(query)
        
        if not project:
            return Response({"detail": "Project not found."}, status=404)
            
        mongo_log('project_logs', {
            'action': 'update',
            'project_id': pk,
            'title': project.get('title'),
        })
        return Response(serialize_mongo_doc(project))

    def partial_update(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def destroy(self, request, pk=None, *args, **kwargs):
        coll = get_projects_collection()
        if coll is None: return Response(status=500)
        
        query = {"_id": ObjectId(pk)} if ObjectId.is_valid(pk) else {"_id": pk}
        project = coll.find_one(query)
        
        if not project:
            return Response({"detail": "Project not found."}, status=404)
            
        coll.delete_one(query)
        mongo_log('project_logs', {
            'action': 'delete',
            'project_id': pk,
            'title': project.get('title'),
        })
        return Response(status=204)

class ProjectCreateView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        return ProjectViewSet().create(request)

class ProjectDeleteView(generics.DestroyAPIView):
    permission_classes = [permissions.AllowAny]
    def delete(self, request, pk=None):
        return ProjectViewSet().destroy(request, pk=pk)
