# Generated by Django 3.1.3 on 2020-12-22 08:17

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('session', '0003_auto_20201221_0749'),
    ]

    operations = [
        migrations.AlterField(
            model_name='session',
            name='date',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2020, 12, 22, 8, 17, 21, 548079), null=True),
        ),
    ]
