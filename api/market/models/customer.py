# Django
from django.db import models

# Utils
from utils.models import MarketBaseModel
from utils.validators import nit_regex_validator


class Customer(MarketBaseModel):
    name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    nit = models.CharField(
        validators=[nit_regex_validator()], max_length=9, unique=True)

    class Meta:
        db_table = '"market"."customer"'

    def __str__(self) -> str:
        return f'{self.name} {self.last_name} Q{self.nit}'
