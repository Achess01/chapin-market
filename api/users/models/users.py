# Django
from django.contrib.auth.models import AbstractUser
from django.db import models


# Utils
from utils.models import MarketBaseModel
from utils.validators import nit_regex_validator, phone_regex_validator, dpi_regex_validator


class User(MarketBaseModel, AbstractUser):
    username = models.CharField(
        validators=[nit_regex_validator()], max_length=13, unique=True,
        error_messages={
            "unique": "A user with that username already exists.",
        },
    )

    phone_number = models.CharField(
        validators=[phone_regex_validator()], max_length=17, blank=True)

    first_name = models.CharField(
        'first name',
        max_length=150
    )

    second_name = models.CharField(
        'second name',
        max_length=150,
        blank=True
    )

    last_name = models.CharField(
        'last name',
        max_length=150
    )

    last_mother_name = models.CharField(
        'last mother name',
        max_length=150,
        blank=True
    )

    date_of_birth = models.DateField('Date of birth')
    dpi = models.CharField(
        validators=[dpi_regex_validator()], max_length=13, unique=True
    )

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['phone_number', 'first_name',
                       'last_name', 'date_of_birth', 'dpi']

    is_admin = models.BooleanField('admin status', default=False)
    is_cashierman = models.BooleanField('cashier status', default=False)
    is_storeman = models.BooleanField('storeman status', default=False)
    is_inventory = models.BooleanField('inventory status', default=False)
    is_new_user = models.BooleanField('New user status', default=True)

    def __str__(self) -> str:
        return f'{self.username} {self.first_name} {self.last_name}'
