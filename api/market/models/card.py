# Django
from django.db import models

# Utils
from utils.models import MarketBaseModel
from utils.validators import nit_regex_validator


class Card(MarketBaseModel):
    TYPES = (
        (1, 'COMUN'),
        (2, 'ORO'),
        (3, 'PLATINO'),
        (4, 'DIAMANTE')
    )

    customer = models.OneToOneField(
        'market.Customer', on_delete=models.CASCADE, related_name='card')
    last_accumulated = models.DecimalField(max_digits=10, decimal_places=2)
    points = models.PositiveIntegerField()
    type = models.PositiveSmallIntegerField(choices=TYPES)

    class Meta:
        db_table = '"market"."card"'

    def __str__(self) -> str:
        return f'{self.customer} ({self.type}) (Q{self.last_accumulated}) ({self.points} pts)'
