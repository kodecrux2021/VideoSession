# Generated by Django 3.1.4 on 2020-12-28 19:10

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('session', '0007_auto_20201228_1852'),
    ]

    operations = [
        migrations.AlterField(
            model_name='session',
            name='date',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2020, 12, 28, 19, 10, 9, 673115), null=True),
        ),
    ]
