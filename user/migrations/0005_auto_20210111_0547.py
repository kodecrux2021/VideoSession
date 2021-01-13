# Generated by Django 3.1.3 on 2021-01-11 05:47

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0004_auto_20210109_0742'),
    ]

    operations = [
        migrations.AddField(
            model_name='educator',
            name='date_of_birth',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2021, 1, 11, 5, 47, 47, 622195), null=True),
        ),
        migrations.AddField(
            model_name='educator',
            name='relevant_experience',
            field=models.FloatField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='educator',
            name='total_experience',
            field=models.FloatField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name='clients',
            name='last_seen',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2021, 1, 11, 5, 47, 47, 621520), null=True),
        ),
        migrations.AlterField(
            model_name='educator',
            name='date',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2021, 1, 11, 5, 47, 47, 621994), null=True),
        ),
        migrations.AlterField(
            model_name='educator',
            name='last_seen',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2021, 1, 11, 5, 47, 47, 622145), null=True),
        ),
    ]
