
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


class StoreProductModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = StoreProduct
        exclude = ('store',)


class ProductShelfModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductShelf
        exclude = ('branch',)


class AddStoreProductsSerializer(serializers.Serializer):

    products = StoreProductModelSerializer(many=True)

    def update(self, instance, validated_data):
        products_updated_created = []
        products = validated_data.get(products, [])

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

    # TODO: Validate products in store

    def update(self, instance, validated_data):
        products_updated_created = []
        products = validated_data.get(products, [])
        branch = instance
        for item in products:
            product = item.get('product', None)
            qty = item.get('qty', None)
            hallway = item.get('hallway', None)
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
