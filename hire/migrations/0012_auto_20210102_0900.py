# Generated by Django 3.1.4 on 2021-01-02 09:00

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hire', '0011_auto_20210102_0510'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hire',
            name='date',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2021, 1, 2, 9, 0, 37, 193601), null=True),
        ),
    ]
