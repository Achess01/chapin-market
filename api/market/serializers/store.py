
from rest_framework import serializers
from market.models import Store


class StoreModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Store
        fields = '__all__'
