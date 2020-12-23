# Generated by Django 3.1.3 on 2020-12-23 11:27

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0007_auto_20201223_1013'),
    ]

    operations = [
        migrations.AlterField(
            model_name='conversation',
            name='last_message_datetime',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2020, 12, 23, 11, 27, 29, 55355), null=True),
        ),
        migrations.AlterField(
            model_name='message',
            name='attachment',
            field=models.FileField(blank=True, null=True, upload_to='uploads/'),
        ),
        migrations.AlterField(
            model_name='message',
            name='date',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2020, 12, 23, 11, 27, 29, 56727), null=True),
        ),
    ]
