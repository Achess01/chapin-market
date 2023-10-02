
from rest_framework import serializers
from market.models import Customer


class CustomerModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = '__all__'


class CustomerTopModelSerializer(serializers.ModelSerializer):
    total_purchases = serializers.DecimalField(max_digits=12, decimal_places=2)

    class Meta:
        model = Customer
        fields = '__all__'
