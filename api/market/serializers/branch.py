
from rest_framework import serializers
from market.models import Branch, Store, StoreProduct, ProductShelf


class BranchModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Branch
        fields = '__all__'

    def create(self, validated_data):
        instance = super().create(validated_data)
        Store.objects.create(branch=instance)
        return instance


class BranchModelTopSerializer(serializers.ModelSerializer):
    total_sales = serializers.DecimalField(max_digits=12, decimal_places=2)
    class Meta:
        model = Branch
        fields = '__all__'

class StoreProductModelSerializer(serializers.ModelSerializer):
    product_name = serializers.SerializerMethodField(read_only=True)

    def get_product_name(self, obj):
        return obj.product.name

    class Meta:
        model = StoreProduct
        exclude = ('store',)


class ProductShelfModelSerializer(serializers.ModelSerializer):

    product_name = serializers.SerializerMethodField(read_only=True)
    price = serializers.SerializerMethodField(read_only=True)

    def get_product_name(self, obj):
        return obj.product.name

    def get_price(self, obj):
        return obj.product.price

    class Meta:
        model = ProductShelf
        exclude = ('branch',)


class AddStoreProductsSerializer(serializers.Serializer):

    products = StoreProductModelSerializer(many=True)

    def update(self, instance, validated_data):
        products_updated_created = []
        products = validated_data.get('products', [])

        store = instance.stores.first()
        for item in products:
            product = item.get('product', None)
            qty = item.get('qty', None)

            try:
                product_updated = StoreProduct.objects.get(
                    product=product, store=store)
                product_updated.qty += qty
                product_updated.save()
                products_updated_created.append(product_updated)
            except StoreProduct.DoesNotExist:
                product_created = StoreProduct.objects.create(
                    product=product, store=store, qty=qty)
                products_updated_created.append(product_created)

        return products_updated_created


class AddProductsShelfSerializer(serializers.Serializer):

    products = ProductShelfModelSerializer(many=True)

    def validate_products(self, products):
        branch = self.instance
        store = branch.stores.first()
        products_count = {}
        for item in products:
            product = item.get('product', None)
            if product is not None:
                if product.id not in products_count:
                    products_count[product.id] = item.get('qty', 0)
                else:
                    products_count[product.id] += item.get('qty', 0)

        for id, qty in products_count.items():
            try:
                product = store.products.get(product=id)
                if product.qty < qty:
                    raise serializers.ValidationError(
                        f'{product.product.name} solo cuenta con {product.qty} unidades')
            except StoreProduct.DoesNotExist:
                raise serializers.ValidationError('El producto no existe')

        return products

    def update(self, instance, validated_data):
        products_updated_created = []
        products = validated_data.get('products', [])
        branch = instance
        store = branch.stores.first()
        for item in products:
            product = item.get('product', None)
            product_store = store.products.get(product=product)
            qty = item.get('qty', None)
            hallway = item.get('hallway', None)
            # Product store
            product_store.qty -= qty
            product_store.save()
            try:
                product_updated = ProductShelf.objects.get(
                    product=product, branch=branch)
                product_updated.qty += qty
                product_updated.hallway = hallway
                product_updated.save()
                products_updated_created.append(product_updated)
            except ProductShelf.DoesNotExist:
                product_created = ProductShelf.objects.create(
                    product=product, branch=branch, qty=qty, hallway=hallway)
                products_updated_created.append(product_created)

        return products_updated_created
