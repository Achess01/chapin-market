from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from market.models import Sale

# Serializers
from market.serializers import (
    SaleModelSerializer,
    CreateSaleModelSerializer,
)

# Permissions
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from users.permissions import (
    IsMarketAdmin, IsCashierStaff, IsInventoryStaff, IsStoreStaff)


# Filters
from rest_framework import filters


class SaleViewSet(viewsets.ModelViewSet):

    queryset = Sale.objects.all()

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateSaleModelSerializer
        return SaleModelSerializer

    def get_permissions(self):
        permissions = [IsAuthenticated]
        if self.action in ['retrieve', 'list']:
            permissions += [IsCashierStaff | IsInventoryStaff |
                            IsStoreStaff | IsMarketAdmin | IsAdminUser]

        elif self.action in ['update', 'partial_update', 'destroy', 'create', 'top']:
            permissions += [IsMarketAdmin | IsAdminUser | IsCashierStaff]

        return [p() for p in permissions]

    @action(detail=False, methods=['get'])
    def top(self, request, *args, **kwargs):
        queryset = self.get_queryset().order_by('-total')[:10]

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
