from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum, DecimalField, Value
from django.db.models.functions import Coalesce

from market.models import Customer

# Serializers
from market.serializers import (
    CustomerModelSerializer,
    CustomerTopModelSerializer
)

# Permissions
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from users.permissions import (
    IsMarketAdmin, IsCashierStaff, IsInventoryStaff, IsStoreStaff)


# Filters
from rest_framework import filters


class CustomerViewSet(viewsets.ModelViewSet):

    queryset = Customer.objects.all()
    serializer_class = CustomerModelSerializer

    def get_permissions(self):
        permissions = [IsAuthenticated]
        if self.action in ['retrieve', 'list']:
            permissions += [IsCashierStaff | IsInventoryStaff |
                            IsStoreStaff | IsMarketAdmin | IsAdminUser]

        elif self.action in ['create', 'update', 'partial_update', 'destroy', 'top']:
            permissions += [IsMarketAdmin | IsAdminUser | IsCashierStaff]

        return [p() for p in permissions]

    @action(detail=False, methods=['get'])
    def top(self, request, *args, **kwargs):

        queryset = self.get_queryset().annotate(
            total_purchases=Coalesce(Sum('purchases__total', output_field=DecimalField()), Value(0, output_field=DecimalField()))).values('name', 'last_name', 'nit', 'total_purchases').order_by('-total_purchases')[:10]

        serializer = CustomerTopModelSerializer(queryset, many=True)
        return Response(serializer.data)
