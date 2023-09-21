# Django
from django.db import models

# Utils
from utils.models import MarketBaseModel


class Cashier(MarketBaseModel):
    number = models.PositiveSmallIntegerField()
    branch = models.ForeignKey(
        'market.Branch', on_delete=models.PROTECT, related_name='cashiers')

    class Meta:
        db_table = '"market"."cashier"'

    def __str__(self) -> str:
        return f'{self.number} - {self.branch}'
