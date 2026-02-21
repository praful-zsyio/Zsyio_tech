from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from apps.utils.mongo import get_mongo_db, mongo_log
from bson.objectid import ObjectId
import datetime
import traceback


def serialize_mongo_doc(doc):
    """Recursively convert MongoDB document to JSON-safe dict."""
    if doc is None:
        return None
    if isinstance(doc, list):
        return [serialize_mongo_doc(i) for i in doc]
    if isinstance(doc, dict):
        result = {}
        for k, v in doc.items():
            if k == '_id':
                result['id'] = str(v)
            elif isinstance(v, ObjectId):
                result[k] = str(v)
            elif isinstance(v, datetime.datetime):
                result[k] = v.isoformat()
            elif isinstance(v, (dict, list)):
                result[k] = serialize_mongo_doc(v)
            else:
                result[k] = v
        return result
    return doc


class AboutViewSet(viewsets.ViewSet):
    """
    Pure MongoDB ViewSet for About content.
    No ORM / serializer dependency.

    GET    /api/about/          → list all about items
    GET    /api/about/<id>/     → retrieve one
    POST   /api/about/          → create
    PUT    /api/about/<id>/     → full update
    PATCH  /api/about/<id>/     → partial update
    DELETE /api/about/<id>/     → delete
    """
    permission_classes = [permissions.AllowAny]
    authentication_classes = []
    parser_classes = (JSONParser, MultiPartParser, FormParser)

    def _coll(self):
        db = get_mongo_db()
        return db['about'] if db is not None else None

    def list(self, request):
        try:
            coll = self._coll()
            if coll is None:
                return Response({"error": "Database not connected"}, status=503)
            items = [serialize_mongo_doc(i) for i in coll.find()]
            return Response(items)
        except Exception as e:
            print(traceback.format_exc())
            return Response({"error": str(e)}, status=500)

    def retrieve(self, request, pk=None):
        try:
            coll = self._coll()
            if coll is None:
                return Response({"error": "Database not connected"}, status=503)
            query = {"_id": ObjectId(pk)} if ObjectId.is_valid(str(pk)) else {"_id": pk}
            item = coll.find_one(query)
            if not item:
                return Response({"detail": "Not found."}, status=404)
            return Response(serialize_mongo_doc(item))
        except Exception as e:
            print(traceback.format_exc())
            return Response({"error": str(e)}, status=400)

    def create(self, request):
        try:
            coll = self._coll()
            if coll is None:
                return Response({"error": "Database not connected"}, status=503)

            data = dict(request.data)
            # Flatten single-value lists from multipart
            data = {k: (v[0] if isinstance(v, list) and len(v) == 1 else v)
                    for k, v in data.items()}
            data['created_at'] = datetime.datetime.utcnow()
            data['updated_at'] = datetime.datetime.utcnow()

            res = coll.insert_one(data)
            data['_id'] = res.inserted_id
            mongo_log('about_logs', {'action': 'create', 'id': str(res.inserted_id)})
            return Response(serialize_mongo_doc(data), status=201)
        except Exception as e:
            print(traceback.format_exc())
            return Response({"error": str(e)}, status=500)

    def update(self, request, pk=None):
        try:
            coll = self._coll()
            if coll is None:
                return Response({"error": "Database not connected"}, status=503)

            query = {"_id": ObjectId(pk)} if ObjectId.is_valid(str(pk)) else {"_id": pk}
            data = dict(request.data)
            data = {k: (v[0] if isinstance(v, list) and len(v) == 1 else v)
                    for k, v in data.items()}
            data.pop('id', None)
            data.pop('_id', None)
            data['updated_at'] = datetime.datetime.utcnow()

            result = coll.update_one(query, {"$set": data})
            if result.matched_count == 0:
                return Response({"detail": "Not found."}, status=404)

            item = coll.find_one(query)
            mongo_log('about_logs', {'action': 'update', 'id': pk})
            return Response(serialize_mongo_doc(item))
        except Exception as e:
            print(traceback.format_exc())
            return Response({"error": str(e)}, status=500)

    def partial_update(self, request, pk=None):
        return self.update(request, pk=pk)

    def destroy(self, request, pk=None):
        try:
            coll = self._coll()
            if coll is None:
                return Response({"error": "Database not connected"}, status=503)

            query = {"_id": ObjectId(pk)} if ObjectId.is_valid(str(pk)) else {"_id": pk}
            result = coll.delete_one(query)
            if result.deleted_count == 0:
                return Response({"detail": "Not found."}, status=404)

            mongo_log('about_logs', {'action': 'delete', 'id': pk})
            return Response({"message": "Deleted successfully."}, status=200)
        except Exception as e:
            print(traceback.format_exc())
            return Response({"error": str(e)}, status=500)
