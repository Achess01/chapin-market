# Django
from django.urls import path, include

# Django REST framework
from rest_framework.routers import DefaultRouter

# Views
from market.views import (BranchViewSet, ProductViewSet,
                          StoreViewSet, CashierViewSet, SaleViewSet, CustomerViewSet, CardViewSet)


router = DefaultRouter()
router.register('branches', BranchViewSet, basename='branch')
router.register('products', ProductViewSet, basename='product')
router.register('stores', StoreViewSet, basename='store')
router.register('cashiers', CashierViewSet, basename='cashier')
router.register('sales', SaleViewSet, basename='sale')
router.register('customers', CustomerViewSet, basename='customer')
router.register('cards', CardViewSet, basename='card')

urlpatterns = [
    path('', include(router.urls))
]
