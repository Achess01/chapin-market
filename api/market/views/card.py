from rest_framework import viewsets

from market.models import Card

# Serializers
from market.serializers import (
    CardModelSerializer
)

# Permissions
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from users.permissions import (
    IsMarketAdmin, IsCashierStaff, IsInventoryStaff, IsStoreStaff)


# Filters
from rest_framework import filters


class CardViewSet(viewsets.ModelViewSet):

    queryset = Card.objects.all()
    serializer_class = CardModelSerializer

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
