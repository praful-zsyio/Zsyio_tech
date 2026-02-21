from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser
from .models import CartModel, CartItemModel
from django.contrib.auth.models import User
import json

class CartViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    authentication_classes = [] 
    parser_classes = [JSONParser, FormParser, MultiPartParser]

    def list(self, request):
        user = request.user if request.user.is_authenticated else None
        if user:
            carts = CartModel.objects.filter(user=user)
        else:
            # For anonymous, we might not have a reliable way without session_id
            # but original code used "anonymous" string as user_id
            carts = CartModel.objects.filter(user__isnull=True)
            
        from .serializers import CartSerializer # Assuming it exists or I should use manual serialization
        # Manual serialization for now to be safe
        data = []
        for cart in carts:
            items = [{"service_slug": i.service_slug, "service_title": i.service_title, "quantity": i.quantity} for i in cart.items.all()]
            data.append({
                "id": cart.id,
                "user_id": str(cart.user.id) if cart.user else "anonymous",
                "items": items,
                "created_at": cart.created_at.isoformat(),
                "updated_at": cart.updated_at.isoformat(),
            })
        return Response(data)

    def retrieve(self, request, pk=None):
        try:
            cart = CartModel.objects.get(pk=pk)
            items = [{"service_slug": i.service_slug, "service_title": i.service_title, "quantity": i.quantity} for i in cart.items.all()]
            return Response({
                "id": cart.id,
                "user_id": str(cart.user.id) if cart.user else "anonymous",
                "items": items,
                "created_at": cart.created_at.isoformat(),
                "updated_at": cart.updated_at.isoformat(),
            })
        except CartModel.DoesNotExist:
            return Response({"detail": "Cart not found"}, status=404)

    @action(detail=False, methods=['post'], url_path='add_item')
    def add_item(self, request):
        user = request.user if request.user.is_authenticated else None
        
        service_slug = request.data.get('service_slug')
        service_title = request.data.get('service_title', service_slug)
        quantity = int(request.data.get('quantity', 1))

        if not service_slug:
            return Response({"error": "service_slug is required"}, status=400)

        # Get or create cart
        if user:
            cart, _ = CartModel.objects.get_or_create(user=user)
        else:
            # Simple fallback for anonymous: use the first cart without a user or create one
            cart = CartModel.objects.filter(user__isnull=True).first()
            if not cart:
                cart = CartModel.objects.create(user=None)

        # Add or update item
        item, created = CartItemModel.objects.get_or_create(
            cart=cart, 
            service_slug=service_slug,
            defaults={'service_title': service_title, 'quantity': quantity}
        )
        if not created:
            item.quantity += quantity
            item.save()

        items = [{"service_slug": i.service_slug, "service_title": i.service_title, "quantity": i.quantity} for i in cart.items.all()]
        return Response({
            "id": cart.id,
            "user_id": str(cart.user.id) if cart.user else "anonymous",
            "items": items,
            "created_at": cart.created_at.isoformat(),
            "updated_at": cart.updated_at.isoformat(),
        })

    @action(detail=False, methods=['delete'], url_path='clear')
    def clear(self, request):
        user = request.user if request.user.is_authenticated else None
        if user:
            CartModel.objects.filter(user=user).delete()
        else:
            CartModel.objects.filter(user__isnull=True).delete()
        return Response({"message": "Cart cleared"}, status=200)
