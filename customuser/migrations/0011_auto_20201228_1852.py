# Generated by Django 3.1.4 on 2020-12-28 18:52

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customuser', '0010_auto_20201228_0545'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='last_seen',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2020, 12, 28, 18, 52, 15, 761403), null=True),
        ),
    ]
