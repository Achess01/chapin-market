
from rest_framework import serializers
from market.models import Customer


class CustomerModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = '__all__'
