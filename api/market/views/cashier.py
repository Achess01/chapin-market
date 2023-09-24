from rest_framework import viewsets

from market.models import Cashier

# Serializers
from market.serializers import (
    CashierModelSerializer
)

# Permissions
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from users.permissions import (
    IsMarketAdmin, IsCashierStaff, IsInventoryStaff, IsStoreStaff)


# Filters
from rest_framework import filters


class CashierViewSet(viewsets.ModelViewSet):

    queryset = Cashier.objects.all()
    serializer_class = CashierModelSerializer

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
