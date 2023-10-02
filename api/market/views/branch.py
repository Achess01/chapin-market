from django.core.exceptions import ObjectDoesNotExist
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum, DecimalField, Value
from django.db.models.functions import Coalesce

from market.models import Branch

# Serializers
from market.serializers import (
    BranchModelSerializer,
    AddStoreProductsSerializer,
    AddProductsShelfSerializer,
    ProductModelSerializer,
    StoreProductModelSerializer,
    ProductShelfModelSerializer,
    BranchModelTopSerializer
)

# Permissions
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from users.permissions import (
    IsMarketAdmin, IsCashierStaff, IsInventoryStaff, IsStoreStaff)


# Filters
from rest_framework import filters


class BranchViewSet(viewsets.ModelViewSet):

    queryset = Branch.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'address']
    serializer_class = BranchModelSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.is_admin:
            return super().get_queryset()

        branch = None
        try:
            if user.is_cashierman and user.cashier_profile is not None:
                branch = user.cashier_profile.branch
            elif user.is_inventory and user.inventory_profile is not None:
                branch = user.inventory_profile.branch
            elif user.is_storeman and user.store_profile is not None:
                branch = user.store_profile.branch
        except ObjectDoesNotExist:
            branch = None

        if branch is None:
            return super().get_queryset().none()
        return super().get_queryset().filter(id=branch.id)

    def get_permissions(self):
        permissions = [IsAuthenticated]
        if self.action in ['retrieve', 'list']:
            permissions += [IsCashierStaff | IsInventoryStaff |
                            IsStoreStaff | IsMarketAdmin | IsAdminUser]

        elif self.action in ['create', 'update', 'partial_update', 'destroy', 'top']:
            permissions += [IsMarketAdmin | IsAdminUser]

        return [p() for p in permissions]

    @action(detail=True, methods=['post'])
    def add_products_store(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = AddStoreProductsSerializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.save()
        serializer_response = StoreProductModelSerializer(data, many=True)
        return Response(serializer_response.data)

    @action(detail=True, methods=['post'])
    def add_products_shelf(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = AddProductsShelfSerializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.save()
        serializer_response = ProductShelfModelSerializer(data, many=True)
        return Response(serializer_response.data)

    @action(detail=True, methods=['get'])
    def get_products(self, request, *args, **kwargs):
        instance = self.get_object()
        store = instance.stores.first()
        queryset = store.products.all()
        serializer = StoreProductModelSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def get_products_shelves(self, request, *args, **kwargs):
        instance = self.get_object()
        queryset = instance.products_shelves.all()
        serializer = ProductShelfModelSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def top(self, request, *args, **kwargs):

        queryset = self.get_queryset().annotate(
            total_sales=Coalesce(
                Sum('sales__total', output_field=DecimalField()), Value(0, output_field=DecimalField())),
        ).values('name', 'address', 'total_sales').order_by('-total_sales')[:3]

        serializer = BranchModelTopSerializer(queryset, many=True)
        return Response(serializer.data)
