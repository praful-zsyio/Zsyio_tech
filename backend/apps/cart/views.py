from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser
from apps.utils.mongo import get_mongo_db, mongo_log
from bson.objectid import ObjectId
import datetime
import re
import traceback
import json


def serialize_mongo_doc(doc):
    """Recursively convert MongoDB types to JSON-serializable formats."""
    if doc is None:
        return None
    if isinstance(doc, list):
        return [serialize_mongo_doc(item) for item in doc]
    if isinstance(doc, dict):
        new_doc = {}
        for k, v in doc.items():
            if k == '_id':
                new_doc['id'] = str(v)
            elif isinstance(v, ObjectId):
                new_doc[k] = str(v)
            elif isinstance(v, datetime.datetime):
                new_doc[k] = v.isoformat()
            elif isinstance(v, (list, dict)):
                new_doc[k] = serialize_mongo_doc(v)
            else:
                new_doc[k] = v
        return new_doc
    return doc


class CartViewSet(viewsets.ViewSet):
    """
    Pure MongoDB cart viewset — no ORM/Django model dependency.
    Routes:
        GET    /api/cart/          -> list user carts
        GET    /api/cart/<id>/     -> retrieve specific cart
        POST   /api/cart/add_item/ -> add or update item in cart
        DELETE /api/cart/clear/    -> clear user cart
    """
    permission_classes = [permissions.AllowAny]
    authentication_classes = []  # Disable JWT check — cart is public
    parser_classes = [JSONParser, FormParser, MultiPartParser]

    def _db(self):
        return get_mongo_db()

    def list(self, request):
        """GET /api/cart/ — list carts for the current user."""
        db = self._db()
        if db is None:
            return Response([])
        user_id = str(request.user.id) if request.user.is_authenticated else "anonymous"
        carts = [serialize_mongo_doc(c) for c in db['carts'].find({"user_id": user_id})]
        return Response(carts)

    def retrieve(self, request, pk=None):
        """GET /api/cart/<id>/ — retrieve a specific cart by ID."""
        db = self._db()
        if db is None:
            return Response({"detail": "DB not connected"}, status=503)
        try:
            query = {"_id": ObjectId(pk)} if ObjectId.is_valid(str(pk)) else {"_id": pk}
            cart = db['carts'].find_one(query)
            if not cart:
                return Response({"detail": "Cart not found"}, status=404)
            return Response(serialize_mongo_doc(cart))
        except Exception as e:
            return Response({"error": str(e)}, status=400)

    @action(detail=False, methods=['post'], url_path='add_item')
    def add_item(self, request):
        """
        POST /api/cart/add_item/
        Body: { "service_slug": "web-development", "quantity": 1 }
        """
        try:
            db = self._db()
            if db is None:
                return Response({"error": "MongoDB not connected"}, status=503)

            user_id = str(request.user.id) if request.user.is_authenticated else "anonymous"

            # --- Robust data extraction (JSON body, form-data, query params) ---
            def get_val(key, default=''):
                # Try request.data first (handles JSON + form-data)
                val = request.data.get(key)
                if val is not None:
                    return val
                # Try query params as fallback
                val = request.query_params.get(key)
                if val is not None:
                    return val
                # Try raw body JSON parse as last resort
                try:
                    body = json.loads(request.body.decode('utf-8'))
                    return body.get(key, default)
                except Exception:
                    pass
                return default

            service_slug = str(get_val('service_slug', '')).strip()
            if not service_slug:
                return Response({
                    "error": "service_slug is required",
                    "hint": "Send JSON body: {\"service_slug\": \"web-development\", \"quantity\": 1}",
                    "content_type_tip": "Make sure Content-Type is application/json in your request headers"
                }, status=400)

            try:
                quantity = int(get_val('quantity', 1) or 1)
                if quantity < 1:
                    quantity = 1
            except (ValueError, TypeError):
                quantity = 1

            # --- Find service in MongoDB (optional lookup for title) ---
            service_title = str(get_val('service_title', '')).strip()
            if not service_title:
                # Try to get title from services collection
                service = db['services'].find_one({"slug": service_slug})
                if not service:
                    service = db['services'].find_one(
                        {"slug": re.compile(f"^{re.escape(service_slug)}$", re.IGNORECASE)}
                    )
                # If not found, just use slug as title — don't block the request
                service_title = service.get('title', service_slug) if service else service_slug

            # --- Get or create the user's cart ---
            cart = db['carts'].find_one({"user_id": user_id})
            if not cart:
                new_cart = {
                    "user_id": user_id,
                    "items": [],
                    "created_at": datetime.datetime.utcnow(),
                    "updated_at": datetime.datetime.utcnow(),
                }
                result = db['carts'].insert_one(new_cart)
                new_cart['_id'] = result.inserted_id
                cart = new_cart

            # Ensure items list is valid
            items = cart.get('items') if isinstance(cart.get('items'), list) else []

            # --- Add or increment the item ---
            found = False
            for item in items:
                if item.get('service_slug') == service_slug:
                    item['quantity'] = int(item.get('quantity', 0)) + quantity
                    found = True
                    break

            if not found:
                items.append({
                    "service_slug": service_slug,
                    "service_title": service_title,
                    "quantity": quantity,
                })

            # --- Persist changes ---
            db['carts'].update_one(
                {"_id": cart['_id']},
                {"$set": {"items": items, "updated_at": datetime.datetime.utcnow()}}
            )
            cart['items'] = items

            mongo_log('cart_activity', {
                'action': 'add_item',
                'user_id': user_id,
                'service_slug': service_slug,
                'quantity': quantity,
            })

            return Response(serialize_mongo_doc(cart), status=200)

        except Exception as e:
            print(traceback.format_exc())
            return Response({
                "error": "Internal Server Error",
                "details": str(e)
            }, status=500)

    @action(detail=False, methods=['delete'], url_path='clear')
    def clear(self, request):
        """DELETE /api/cart/clear/ — remove all cart items for the user."""
        db = self._db()
        if db is None:
            return Response(status=503)
        user_id = str(request.user.id) if request.user.is_authenticated else "anonymous"
        db['carts'].delete_many({"user_id": user_id})
        return Response({"message": "Cart cleared"}, status=200)
