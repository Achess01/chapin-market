""" Data validators """

# Django
from django.core.validators import RegexValidator


def nit_regex_validator():
    nit_regex = RegexValidator(
        regex=r'[1-9][0-9]{8}$',
        message="Nit must be 9 digits"
    )
    return nit_regex


def dpi_regex_validator():
    dpi_regex = RegexValidator(
        regex=r'[1-9][0-9]{12}$',
        message="DPI must be 13 digits"
    )
    return dpi_regex


def phone_regex_validator():
    phone_regex = RegexValidator(
        regex=r'\+?1?\d{9,15}$',
        message="Phone number must be entered in the format: +99999999. Up to 15 digits allowed."
    )
    return phone_regex


def barcode_regex_validator():
    barcode_regex = RegexValidator(
        regex=r'\d{12}$',
        message='Barcode must be 12 digits'
    )

    return barcode_regex
