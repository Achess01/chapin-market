
from rest_framework import serializers
from market.models import Card


class CardModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Card
        fields = '__all__'
