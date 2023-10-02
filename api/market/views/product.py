from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum, F, DecimalField, Value
from django.db.models.functions import Coalesce

from market.models import Product

# Serializers
from market.serializers import (
    ProductModelSerializer,
    ProductTopModelSerializer,
)

# Permissions
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from users.permissions import (
    IsMarketAdmin, IsCashierStaff, IsInventoryStaff, IsStoreStaff)


# Filters
from rest_framework import filters


class ProductViewSet(viewsets.ModelViewSet):

    queryset = Product.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'barcode']
    serializer_class = ProductModelSerializer

    def get_permissions(self):
        permissions = [IsAuthenticated]
        if self.action in ['retrieve', 'list']:
            permissions += [IsCashierStaff | IsInventoryStaff |
                            IsStoreStaff | IsMarketAdmin | IsAdminUser]

        elif self.action in ['update', 'partial_update', 'destroy', 'create', 'top']:
            permissions += [IsMarketAdmin | IsAdminUser]

        return [p() for p in permissions]

    @action(detail=False, methods=['get'])
    def top(self, request, *args, **kwargs):

        queryset = self.get_queryset().annotate(
            total_sales=Coalesce(Sum(F('sales__unit_price') * F('sales__qty'), output_field=DecimalField()), Value(0, output_field=DecimalField()))).values('name', 'barcode', 'price', 'total_sales').order_by('-total_sales')[:10]

        serializer = ProductTopModelSerializer(queryset, many=True)
        return Response(serializer.data)
