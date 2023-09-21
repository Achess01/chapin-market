# Django
from django.db import models

# Utils
from utils.models import MarketBaseModel
from utils.validators import barcode_regex_validator


class Product(MarketBaseModel):
    name = models.CharField(max_length=30, unique=True)
    barcode = models.CharField(
        validators=[barcode_regex_validator()], max_length=12, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = '"market"."product"'

    def __str__(self) -> str:
        return f'{self.name} {self.barcode} Q{self.price}'
