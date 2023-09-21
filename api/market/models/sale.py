# Django
from django.db import models

# Utils
from utils.models import MarketBaseModel
from utils.validators import nit_regex_validator


def increment_invoice_number():
    last_invoice = Sale.objects.all().order_by('id').last()
    if not last_invoice:
        return 'CH0001'
    invoice_no = last_invoice.invoice_no
    invoice_int = int(invoice_no.split('CH')[-1])
    new_invoice_int = invoice_int + 1
    new_invoice_no = 'MAG' + str(new_invoice_int).zfill(4)
    return new_invoice_no


class Sale(MarketBaseModel):
    invoice_no = models.CharField(
        max_length=255, unique=True, default=increment_invoice_number)
    customer_nit = models.CharField(
        validators=[nit_regex_validator()], max_length=9, unique=True)
    customer_name = models.CharField(max_length=70)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    branch = models.ForeignKey(
        'market.Branch', null=True, on_delete=models.SET_NULL, related_name='sales')
    customer = models.ForeignKey(
        'market.Customer', null=True, on_delete=models.SET_NULL, related_name='purchases')
    cashier = models.ForeignKey(
        'market.Cashier', null=True, on_delete=models.SET_NULL, related_name='sales')
    cashierStaff = models.ForeignKey(
        'users.CashierStaff', null=True, on_delete=models.SET_NULL, related_name='sales')

    class Meta:
        db_table = '"market"."sale"'

    def __str__(self) -> str:
        return f'{self.invoice_no} {self.customer_nit} {self.customer_name} Q{self.total}'
