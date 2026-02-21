from django.db import models

# Create your mode
class CartModel(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='carts', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Cart'
        verbose_name_plural = 'Carts'

    def __str__(self):
        return f"Cart {self.id} ({self.user})"

class CartItemModel(models.Model):
    cart = models.ForeignKey(CartModel, on_delete=models.CASCADE, related_name='items')
    service_slug = models.CharField(max_length=100, help_text="Service slug reference")
    service_title = models.CharField(max_length=255, help_text="Service title for display")
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        verbose_name = 'Cart Item'
        verbose_name_plural = 'Cart Items'

    def __str__(self):
        return f"{self.quantity} x {self.service_title}"
