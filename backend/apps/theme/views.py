from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from apps.utils.mongo import get_mongo_db, mongo_log
import datetime
from bson.objectid import ObjectId

def serialize_mongo_doc(doc):
    if doc is None: return None
    doc['id'] = str(doc.pop('_id'))
    return doc

class UserThemeView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        db = get_mongo_db()
        if not db: return Response({"error": "DB error"}, status=500)
        
        user_id = str(request.user.id) if request.user.is_authenticated else None
        session_id = request.session.session_key
        if not session_id and not user_id:
            request.session.create()
            session_id = request.session.session_key
            
        query = {"user_id": user_id} if user_id else {"session_id": session_id}
        theme_pref = db['theme_preferences'].find_one(query)
        
        if not theme_pref:
            theme_pref = {
                "user_id": user_id,
                "session_id": session_id,
                "theme_mode": "dark",
                "created_at": datetime.datetime.utcnow()
            }
            res = db['theme_preferences'].insert_one(theme_pref)
            theme_pref['_id'] = res.inserted_id
            
        return Response({
            "success": True,
            "data": serialize_mongo_doc(theme_pref),
            "is_authenticated": user_id is not None
        })

    def post(self, request):
        db = get_mongo_db()
        if not db: return Response({"error": "DB error"}, status=500)
        
        user_id = str(request.user.id) if request.user.is_authenticated else None
        session_id = request.session.session_key or "guest"
        
        query = {"user_id": user_id} if user_id else {"session_id": session_id}
        data = request.data.copy()
        data['updated_at'] = datetime.datetime.utcnow()
        
        db['theme_preferences'].update_one(query, {"$set": data}, upsert=True)
        theme_pref = db['theme_preferences'].find_one(query)
        
        mongo_log('theme_logs', {
            'action': 'update_user_theme',
            'user_id': user_id or session_id,
            'theme_mode': data.get('theme_mode'),
        })
        
        return Response({
            "success": True,
            "data": serialize_mongo_doc(theme_pref)
        })

class GlobalThemeView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        db = get_mongo_db()
        if not db: return Response({"error": "DB error"}, status=500)
        
        config = db['global_theme_config'].find_one({"type": "main"})
        if not config:
            config = {
                "type": "main",
                "default_theme": "dark",
                "allow_user_customization": True,
                "brand_primary": "#3b82f6",
                "brand_secondary": "#8b5cf6",
                "brand_accent": "#ec4899"
            }
            db['global_theme_config'].insert_one(config)
            
        return Response({
            "success": True,
            "data": serialize_mongo_doc(config)
        })

    def post(self, request):
        db = get_mongo_db()
        if not db: return Response(status=500)
        
        data = request.data.copy()
        db['global_theme_config'].update_one({"type": "main"}, {"$set": data}, upsert=True)
        config = db['global_theme_config'].find_one({"type": "main"})
        
        mongo_log('theme_logs', {'action': 'update_global_theme'})
        return Response({
            "success": True,
            "data": serialize_mongo_doc(config)
        })
