# Generated by Django 3.1.3 on 2021-01-11 05:48

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0005_auto_20210111_0547'),
    ]

    operations = [
        migrations.AddField(
            model_name='clients',
            name='is_active',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='educator',
            name='is_active',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='clients',
            name='last_seen',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2021, 1, 11, 5, 48, 41, 973205), null=True),
        ),
        migrations.AlterField(
            model_name='educator',
            name='date',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2021, 1, 11, 5, 48, 41, 973706), null=True),
        ),
        migrations.AlterField(
            model_name='educator',
            name='date_of_birth',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2021, 1, 11, 5, 48, 41, 974734), null=True),
        ),
        migrations.AlterField(
            model_name='educator',
            name='last_seen',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2021, 1, 11, 5, 48, 41, 974680), null=True),
        ),
    ]
