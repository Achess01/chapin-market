
from rest_framework import serializers
from market.models import Cashier


class CashierModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cashier
        fields = '__all__'
