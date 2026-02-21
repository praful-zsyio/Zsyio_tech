from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import ColorPalette, ColorScheme, CustomColor, GradientPreset
from apps.utils.mongo import get_mongo_db, mongo_log
from bson.objectid import ObjectId
import datetime

def serialize_mongo_doc(doc):
    if doc is None: return None
    if isinstance(doc, list):
        return [serialize_mongo_doc(item) for item in doc]
    if isinstance(doc, dict):
        new_doc = {}
        for k, v in doc.items():
            if k == '_id':
                new_doc['id'] = str(v)
            elif isinstance(v, (ObjectId, datetime.datetime)):
                new_doc[k] = str(v) if isinstance(v, ObjectId) else v.isoformat()
            elif isinstance(v, (list, dict)):
                new_doc[k] = serialize_mongo_doc(v)
            else:
                new_doc[k] = v
        return new_doc
    return doc

class ColorPaletteViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def get_collection(self):
        db = get_mongo_db()
        return db['color_palettes'] if db is not None else None

    def list(self, request):
        coll = self.get_collection()
        if coll is None: return Response([])
        return Response([serialize_mongo_doc(p) for p in coll.find()])

    def create(self, request):
        coll = self.get_collection()
        if coll is None: return Response(status=500)
        data = request.data.copy()
        res = coll.insert_one(data)
        data['id'] = str(res.inserted_id)
        return Response(serialize_mongo_doc(data), status=201)

    @action(detail=False, methods=['get'])
    def active(self, request):
        coll = self.get_collection()
        if coll is None: return Response([])
        return Response([serialize_mongo_doc(p) for p in coll.find({"is_active": True})])

    @action(detail=False, methods=['get'])
    def default(self, request):
        coll = self.get_collection()
        if coll is None: return Response(status=404)
        palette = coll.find_one({"is_default": True})
        if not palette: return Response({"message": "No default palette"}, status=404)
        return Response(serialize_mongo_doc(palette))

class ColorSchemeViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        db = get_mongo_db()
        if not db: return Response([])
        return Response([serialize_mongo_doc(s) for s in db['color_schemes'].find()])

    @action(detail=False, methods=['get'])
    def by_theme(self, request):
        theme_type = request.query_params.get('type', 'light')
        db = get_mongo_db()
        if not db: return Response([])
        schemes = [serialize_mongo_doc(s) for s in db['color_schemes'].find({"theme_type": theme_type, "is_active": True})]
        return Response({"success": True, "theme_type": theme_type, "data": schemes})

class CustomColorViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        db = get_mongo_db()
        if not db: return Response([])
        return Response([serialize_mongo_doc(c) for c in db['custom_colors'].find()])

    @action(detail=False, methods=['css_variables'])
    def css_variables(self, request):
        db = get_mongo_db()
        if not db: return Response({})
        colors = db['custom_colors'].find({"is_active": True})
        css_vars = {c.get('css_variable'): {"value": c.get('color_value')} for c in colors}
        return Response({"success": True, "css_variables": css_vars})

class GradientPresetViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        db = get_mongo_db()
        if not db: return Response([])
        return Response([serialize_mongo_doc(g) for g in db['gradient_presets'].find()])

    @action(detail=False, methods=['get'])
    def active(self, request):
        db = get_mongo_db()
        if not db: return Response([])
        return Response([serialize_mongo_doc(g) for g in db['gradient_presets'].find({"is_active": True})])
