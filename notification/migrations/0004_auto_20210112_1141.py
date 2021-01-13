# Generated by Django 3.1.3 on 2021-01-12 11:41

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notification', '0003_auto_20210112_1033'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='created_at',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2021, 1, 12, 11, 41, 19, 560452), null=True),
        ),
        migrations.AlterField(
            model_name='notification',
            name='seen_by',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AlterField(
            model_name='request',
            name='datetime',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2021, 1, 12, 11, 41, 19, 559937), null=True),
        ),
    ]
