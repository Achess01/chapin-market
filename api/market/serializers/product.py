
from rest_framework import serializers
from market.models import Product


class ProductModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'
