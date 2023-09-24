
from rest_framework import serializers
from market.models import Sale


class SaleModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sale
        fields = '__all__'
