# Django
from django.db import models

# Utils
from utils.models import MarketBaseModel


class InventoryStaff(MarketBaseModel):
    branch = models.ForeignKey(
        'market.Branch', on_delete=models.CASCADE, related_name='inventory_staff')
    user = models.OneToOneField(
        'users.User', on_delete=models.CASCADE, related_name='inventory_profile')

    class Meta:
        db_table = '"employees"."inventory_staff"'

    def __str__(self) -> str:
        return f'{self.user} ({self.branch})'


class CashierStaff(MarketBaseModel):
    branch = models.ForeignKey(
        'market.Branch', on_delete=models.CASCADE, related_name='cashier_staff')
    user = models.OneToOneField(
        'users.User', on_delete=models.CASCADE, related_name='cashier_profile')
    cashier = models.OneToOneField(
        'market.Cashier', null=True, on_delete=models.SET_NULL, related_name='employee')

    class Meta:
        db_table = '"employees"."cashier_staff"'

    def __str__(self) -> str:
        return f'{self.user} ({self.branch})'


class StoreStaff(MarketBaseModel):
    branch = models.ForeignKey(
        'market.Branch', on_delete=models.CASCADE, related_name='store_staff')
    user = models.OneToOneField(
        'users.User', on_delete=models.CASCADE, related_name='store_profile')

    class Meta:
        db_table = '"employees"."store_staff"'

    def __str__(self) -> str:
        return f'{self.user} ({self.branch})'
