# Generated by Django 3.1.4 on 2021-01-02 10:42

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customuser', '0016_auto_20210102_0900'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='last_seen',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2021, 1, 2, 10, 42, 55, 19765), null=True),
        ),
    ]
