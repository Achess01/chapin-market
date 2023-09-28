
from rest_framework import serializers
from market.models import Sale, SaleProduct


class SaleProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = SaleProduct
        exclude = ('sale',)


class SaleModelSerializer(serializers.ModelSerializer):
    products = SaleProductSerializer(many=True)

    class Meta:
        model = Sale
        fields = '__all__'


class CreateSaleModelSerializer(serializers.ModelSerializer):
    products = SaleProductSerializer(many=True)

    # TODO: Remove some fields and make calculations in back
    class Meta:
        model = Sale
        fields = '__all__'

    def validate_products(self, products):
        if products is None or len(products) < 1:
            raise serializers.ValidationError('There are no products')

        return products

    def create(self, validated_data):
        products = validated_data.pop('products', [])
        instance = super().create(validated_data)
        for product in products:
            SaleProduct.objects.create(**product, sale=instance)

        return instance
