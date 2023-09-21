# Django
from django.db import models

# Utils
from utils.models import MarketBaseModel


class Branch(MarketBaseModel):
    name = models.CharField(max_length=20, unique=True)
    address = models.CharField(max_length=20, unique=True)

    class Meta:
        db_table = '"market"."branch"'

    def __str__(self) -> str:
        return f'{self.name} {self.address}'
