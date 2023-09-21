# Django
from django.db import models

# Utils
from utils.models import MarketBaseModel


class Store(MarketBaseModel):
    branch = models.ForeignKey(
        'market.Branch', on_delete=models.PROTECT, related_name='stores')

    class Meta:
        db_table = '"market"."store"'

    def __str__(self) -> str:
        return f'Store for {self.branch}'
