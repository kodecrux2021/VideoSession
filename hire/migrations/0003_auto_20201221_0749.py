# Generated by Django 3.1.3 on 2020-12-21 07:49

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hire', '0002_auto_20201218_1642'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hire',
            name='date',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2020, 12, 21, 7, 49, 53, 95442), null=True),
        ),
    ]
