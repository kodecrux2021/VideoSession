# Generated by Django 3.1.3 on 2021-01-28 11:26

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notification', '0010_auto_20210125_1348'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='created_at',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2021, 1, 28, 11, 26, 26, 214850), null=True),
        ),
        migrations.AlterField(
            model_name='request',
            name='datetime',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2021, 1, 28, 11, 26, 26, 212078), null=True),
        ),
    ]
