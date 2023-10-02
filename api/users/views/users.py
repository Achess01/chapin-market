""" Users views """

# Django REST Framework
from rest_framework import status, viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response

# Permissions
from rest_framework.permissions import (
    IsAuthenticated,
    IsAdminUser,
)

from users.permissions import (
    IsMarketAdmin, IsNotSuperObjAdmin)


# Models
from users.models import (
    User,
)

# Serializers
from users.serializers import (
    UserLoginSerializer,
    UserModelSerializer,
    UserSignUpModelSerializer,
    InitialPasswordSerializer,
    ChangeUserPasswordSerializer,
)

# Utilities
from datetime import timedelta


class UserViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserModelSerializer

    def get_permissions(self):
        """ Assign permissions based on action """
        permissions = []
        if self.action in ['login', 'initial_password']:
            permissions = []
        elif self.action in ['destroy', 'reset_password']:
            permissions += [IsAuthenticated, IsAdminUser |
                            IsMarketAdmin, IsNotSuperObjAdmin]
        else:
            permissions += [IsAuthenticated, IsAdminUser | IsMarketAdmin]

        return [p() for p in permissions]

    @action(detail=False, methods=['post'])
    def login(self, request, *args, **kwargs):
        """ User login """
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user, token = serializer.save()
        user_data = UserModelSerializer(user).data
        data = user_data
        data['token'] = token

        return Response(data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def initial_password(self, request, *args, **kwargs):
        """ Password change for new users """
        serializer = InitialPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.save()
        return Response(data, status=status.HTTP_202_ACCEPTED)

    @action(detail=True, methods=['post'])
    def reset_password(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = ChangeUserPasswordSerializer(data=request.data)
        serializer.context['request'] = request
        serializer.context['user'] = user
        serializer.is_valid(raise_exception=True)
        data = serializer.save()
        return Response(data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def signup(self, request, *args, **kwargs):
        serializer = UserSignUpModelSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({"username": user.username, "password": serializer.context['raw_password']}, status=status.HTTP_201_CREATED)
