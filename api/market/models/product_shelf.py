# Django
from django.db import models

# Utils
from utils.models import MarketBaseModel


class ProductShelf(MarketBaseModel):
    product = models.ForeignKey(
        'market.Product', on_delete=models.PROTECT, related_name='branches_shelves')
    branch = models.ForeignKey(
        'market.Branch', on_delete=models.PROTECT, related_name='products_shelves')
    qty = models.PositiveIntegerField(help_text='Quantity of product in the branch shelves')
    hallway = models.PositiveSmallIntegerField('Hallway number where a product can be find')

    class Meta:
        db_table = '"market"."product_shelf"'
        unique_together = (("product", "branch"))

    def __str__(self) -> str:
        return f'{self.product} {self.qty} units, hallway: {self.hallway} - {self.branch}'
