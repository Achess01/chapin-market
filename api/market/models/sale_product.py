# Django
from django.db import models

# Utils
from utils.models import MarketBaseModel
from utils.validators import nit_regex_validator


class SaleProduct(MarketBaseModel):

    qty = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    sale = models.ForeignKey(
        'market.Sale', on_delete=models.CASCADE, related_name='products')
    product = models.ForeignKey(
        'market.Product', on_delete=models.CASCADE, related_name='sales')

    @property
    def total(self):
        return self.qty * self.unit_price

    class Meta:
        db_table = '"market"."sale_product"'

    def __str__(self) -> str:
        return f'{self.sale} - {self.product} Q{self.unit_price} * {self.qty} - Q{self.total}'
