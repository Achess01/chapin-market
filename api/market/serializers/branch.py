
from rest_framework import serializers
from market.models import Branch


class BranchModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Branch
        fields = '__all__'
