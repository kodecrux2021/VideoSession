# Generated by Django 3.1.4 on 2020-12-31 11:48

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0011_auto_20201230_0736'),
    ]

    operations = [
        migrations.AlterField(
            model_name='conversation',
            name='last_message_datetime',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2020, 12, 31, 11, 48, 34, 674050), null=True),
        ),
        migrations.AlterField(
            model_name='message',
            name='date',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2020, 12, 31, 11, 48, 34, 675323), null=True),
        ),
    ]
