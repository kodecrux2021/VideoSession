# Generated by Django 3.1.4 on 2021-01-02 13:12

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0017_auto_20210102_1234'),
    ]

    operations = [
        migrations.AlterField(
            model_name='conversation',
            name='last_message_datetime',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2021, 1, 2, 13, 12, 18, 262367), null=True),
        ),
        migrations.AlterField(
            model_name='message',
            name='date',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2021, 1, 2, 13, 12, 18, 263918), null=True),
        ),
    ]
