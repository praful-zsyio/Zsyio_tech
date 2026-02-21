from rest_framework import serializers
from .models import CartModel, CartItemModel

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItemModel
        fields = ['id', 'service_slug', 'service_title', 'quantity']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = CartModel
        fields = ['id', 'user', 'items', 'created_at', 'updated_at']
