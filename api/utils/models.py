""" Django models utilities """

# Django
from django.db import models


class MarketBaseModel(models.Model):
    created = models.DateTimeField('created at', auto_now_add=True)
    modified = models.DateTimeField('modified at', auto_now=True)

    class Meta:
        abstract = True
        get_latest_by = 'created'
        ordering = ['-created', '-modified']
