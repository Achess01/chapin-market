# Generated by Django 4.2 on 2023-09-21 05:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0001_initial'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='StoreStaff',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='created at')),
                ('modified', models.DateTimeField(auto_now=True, verbose_name='modified at')),
                ('branch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='store_staff', to='market.branch')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='store_profile', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': '"employees"."store_staff"',
            },
        ),
        migrations.CreateModel(
            name='InventoryStaff',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='created at')),
                ('modified', models.DateTimeField(auto_now=True, verbose_name='modified at')),
                ('branch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='inventory_staff', to='market.branch')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='inventory_profile', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': '"employees"."inventory_staff"',
            },
        ),
        migrations.CreateModel(
            name='CashierStaff',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='created at')),
                ('modified', models.DateTimeField(auto_now=True, verbose_name='modified at')),
                ('branch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cashier_staff', to='market.branch')),
                ('cashier', models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='employee', to='market.cashier')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='cashier_profile', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': '"employees"."cashier_staff"',
            },
        ),
    ]
