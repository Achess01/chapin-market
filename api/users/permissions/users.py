""" User permissions """

# Permissions
from rest_framework.permissions import BasePermission


class IsMarketAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_admin


class IsCashierStaff(BasePermission):

    def has_permission(self, request, view):
        return request.user.is_cashierman


class IsStoreStaff(BasePermission):

    def has_permission(self, request, view):
        return request.user.is_storeman


class IsInventoryStaff(BasePermission):

    def has_permission(self, request, view):
        return request.user.is_inventory


class IsNotSuperObjAdmin(BasePermission):

    def has_object_permission(self, request, view, obj):
        return not obj.is_staff
