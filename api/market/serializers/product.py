
from rest_framework import serializers
from market.models import Product


class ProductModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'


class ProductTopModelSerializer(serializers.ModelSerializer):
    total_sales = serializers.DecimalField(max_digits=12, decimal_places=2)

    class Meta:
        model = Product
        fields = '__all__'
