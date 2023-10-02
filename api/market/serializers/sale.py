
from rest_framework import serializers
from market.models import Sale, SaleProduct, ProductShelf

# Serializers
from market.serializers import BranchModelSerializer


class SaleProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = SaleProduct
        exclude = ('sale',)


class SaleModelSerializer(serializers.ModelSerializer):
    products = SaleProductSerializer(many=True)
    branch = BranchModelSerializer()

    class Meta:
        model = Sale
        fields = '__all__'


class CreateSaleModelSerializer(serializers.ModelSerializer):
    products = SaleProductSerializer(many=True)

    class Meta:
        model = Sale
        exclude = ('subtotal', 'total')

    def validate_products(self, products):
        if products is None or len(products) < 1:
            raise serializers.ValidationError('There are no products')

        return products

    def validate(self, attrs):
        branch = attrs.get('branch')
        products = attrs.get('products')
        products_shelves = branch.products_shelves.all()
        products_count = self.get_joined_products(products)

        for product in products_count:
            qty = product.get('qty')
            product_sale = product.get('product')
            try:
                product_shelve = products_shelves.get(product=product_sale.id)
                if product_shelve.qty < qty:
                    raise serializers.ValidationError(
                        f'{product_shelve.product.name} solo cuenta con {product_shelve.qty} unidades')
            except ProductShelf.DoesNotExist:
                raise serializers.ValidationError('El producto no existe')

        return attrs

    def get_joined_products(self, products):
        products_count = {}
        for item in products:
            product = item.get('product')
            if product.id not in products_count:
                products_count[product.id] = {**item}
            else:
                products_count[product.id]['qty'] += item.get('qty', 0)

        return products_count.values()

    def get_subtotal(self, joined_products):
        total = 0
        for product in joined_products:
            total += product.get('qty') * product.get('unit_price')
        return total

    def get_discount(self):
        return 0

    def create(self, validated_data):
        products = validated_data.pop('products', [])
        joined_products = self.get_joined_products(products)
        subtotal = self.get_subtotal(joined_products)
        discount = self.get_discount()
        total = subtotal - discount if subtotal >= discount else 0
        validated_data['total'] = total
        validated_data['discount'] = discount
        validated_data['subtotal'] = subtotal
        instance = super().create(validated_data)

        branch = validated_data.get('branch')
        products_shelves = branch.products_shelves.all()
        for product in joined_products:
            product_item = product.get('product')
            product_shelf = products_shelves.get(product=product_item.id)
            qty = product.get('qty')
            # Product shelf
            product_shelf.qty -= qty
            product_shelf.save()
            SaleProduct.objects.create(**product, sale=instance)

        return instance
