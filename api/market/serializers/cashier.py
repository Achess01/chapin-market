
from rest_framework import serializers
from market.models import Cashier


class CashierModelSerializer(serializers.ModelSerializer):
    branch_name = serializers.SerializerMethodField(read_only=True)
    label = serializers.SerializerMethodField(read_only=True)

    def get_branch_name(self, obj):
        return obj.branch.name

    def get_label(self, obj):
        return f'{obj.branch.name} - {obj.number}'

    class Meta:
        model = Cashier
        fields = '__all__'
