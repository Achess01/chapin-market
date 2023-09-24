""" Users urls """

# Django
from django.urls import path, include

# Django REST framework
from rest_framework.routers import DefaultRouter

# Views
from users.views import UserViewSet


router = DefaultRouter()
router.register('users', UserViewSet, basename='user')


urlpatterns = [
    path('', include(router.urls))
]
