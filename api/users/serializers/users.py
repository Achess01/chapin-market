# Django
from django.contrib.auth import authenticate, password_validation

# Django REST Framework
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator

# Models
from users.models import (
    User,
    CashierStaff,
    InventoryStaff,
    StoreStaff,
)

from market.models import (
    Branch,
    Cashier,
)

# Utils
from utils.validators import nit_regex_validator, phone_regex_validator
from utils.generate_password import generate_user_password


class UserSignUpModelSerializer(serializers.ModelSerializer):
    """ Serializer for User Sign Up """
    username = serializers.CharField(
        validators=[
            nit_regex_validator(),
            UniqueValidator(queryset=User.objects.all())
        ]
    )

    phone_number = serializers.CharField(
        validators=[phone_regex_validator()], max_length=17)

    branch = serializers.PrimaryKeyRelatedField(
        queryset=Branch.objects.all(), write_only=True, required=False)

    cashier = serializers.PrimaryKeyRelatedField(
        queryset=Cashier.objects.all(), write_only=True, required=False)

    def validate(self, data):
        is_cashierman = data.get('is_cashierman', False)
        is_storeman = data.get('is_storeman', False)
        is_inventory = data.get('is_inventory', False)
        branch = data.get('branch', None)
        cashier = data.get('branch', None)

        has_profile = is_cashierman or is_storeman or is_inventory
        if has_profile and branch is None:
            raise serializers.ValidationError('Branch not provided')

        if is_cashierman and cashier is None:
            raise serializers.ValidationError('Cashier not provided')

        return data

    class Meta:
        model = User
        fields = [
            'first_name',
            'last_name',
            'username',
            'phone_number',
            'dpi',
            'date_of_birth',
            'is_admin',
            'is_cashierman',
            'is_storeman',
            'is_inventory'
        ]

    def create(self, validated_data):
        branch = validated_data.get('branch', None)
        validated_data.pop('branch')
        cashier = validated_data.get('cashier', None)
        validated_data.pop('cashier')

        password = generate_user_password()
        self.context['raw_password'] = password
        validated_data['password'] = password
        validated_data['is_new_user'] = True
        user = User.objects.create_user(**validated_data)
        # Create user profiles
        if user.is_cashierman:
            CashierStaff.objects.create(
                user=user, brach=branch, cashier=cashier)
        elif user.is_storeman:
            StoreStaff.objects.create(user=user, brach=branch)
        elif user.is_inventory:
            InventoryStaff.objects.create(user=user, brach=branch)

        return user


class CashierStaffModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = CashierStaff


class InventoryStaffModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = InventoryStaff


class StoreStaffModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = StoreStaff


class InitialPasswordSerializer(serializers.Serializer):
    """ Initial password serializer """
    username = serializers.CharField(
        validators=[nit_regex_validator()]
    )
    old_password = serializers.CharField(min_length=5, max_length=64)
    password = serializers.CharField(min_length=5, max_length=64)
    password_confirmation = serializers.CharField(min_length=5, max_length=64)

    def validate(self, data):
        """ Check credentials and if user changed given password """
        user = authenticate(
            username=data['username'],
            password=data['old_password']
        )
        passwd = data['password']
        passwd_conf = data['password_confirmation']

        if not user:
            raise serializers.ValidationError('Invalid credentials')
        if not user.is_new_user or user.is_staff:
            raise serializers.ValidationError(
                'You have already changed you initial password')

        if passwd != passwd_conf:
            raise serializers.ValidationError(
                'Password and password confirmation don\'t match'
            )

        password_validation.validate_password(passwd)

        self.context['user'] = user
        return data

    def create(self, data):
        """ Change password"""
        user = self.context['user']
        user.set_password(data['password'])
        user.is_new_user = False
        user.save()
        return {"message": "Password changed!"}


class ChangeUserPasswordSerializer(serializers.Serializer):
    """ Change User password in extreme case. Use when forget password """

    def validate(self, data):
        """ Validate new password """
        user = self.context['user']
        if user.is_staff:
            raise serializers.ValidationError(
                'You cannot change superuser password')
        return data

    def create(self, validated_data):
        new_password = generate_user_password()
        user = self.context['user']
        user.set_password(new_password)
        user.is_new_user = True
        user.save()
        return {"new_password": new_password}


class UserLoginSerializer(serializers.Serializer):
    """ User login model serializer """
    username = serializers.CharField(
        validators=[nit_regex_validator()]
    )
    password = serializers.CharField(min_length=5, max_length=64)

    def validate(self, data):
        """ Check credentials and if user changed given password """
        user = authenticate(
            username=data['username'],
            password=data['password']
        )
        if not user:
            raise serializers.ValidationError('Invalid credentials')
        # TODO: Apply this on frontend
        # if user.is_new_user and not user.is_staff:
        #     raise serializers.ValidationError('You must change your password')

        self.context['user'] = user
        return data

    def create(self, validated_data):
        token, created = Token.objects.get_or_create(user=self.context['user'])
        return self.context['user'], token.key


class UserModelSerializer(serializers.ModelSerializer):
    """ User model serializer """
    class Meta:
        model = User
        fields = [
            'id',
            'first_name',
            'second_name',
            'last_name',
            'last_mother_name',
            'username',
            'dpi',
            'phone_number',
            'is_admin',
            'is_cashierman',
            'is_storeman',
            'is_inventory',
            'is_staff',
        ]

        read_only_fields = [
            'is_admin',
            'is_cashierman',
            'is_storeman',
            'is_inventory',
            'is_staff',
        ]
