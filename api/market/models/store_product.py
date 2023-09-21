# Django
from django.db import models

# Utils
from utils.models import MarketBaseModel


class StoreProduct(MarketBaseModel):
    product = models.ForeignKey(
        'market.Product', on_delete=models.PROTECT, related_name='stores')
    store = models.ForeignKey(
        'market.Store', on_delete=models.PROTECT, related_name='products')
    qty = models.PositiveIntegerField(
        help_text='Quantity of product in the store')

    class Meta:
        db_table = '"market"."store_product"'
        unique_together = (("product", "store"))

    def __str__(self) -> str:
        return f'Store for {self.product} ({self.qty}) - {self.store}'
