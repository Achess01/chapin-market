from rest_framework import viewsets

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

    # TODO: check permissions
    def get_permissions(self):
        permissions = [IsAuthenticated]
        if self.action in ['retrieve', 'list']:
            permissions += [IsCashierStaff | IsInventoryStaff |
                            IsStoreStaff | IsMarketAdmin | IsAdminUser]

        elif self.action in ['update', 'partial_update', 'destroy']:
            permissions += [IsMarketAdmin | IsAdminUser]

        elif self.action in ['create']:
            permissions += [IsMarketAdmin | IsAdminUser]

        return [p() for p in permissions]
