# Generated by Django 3.1.3 on 2021-01-09 07:41

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user', '0003_auto_20210109_0741'),
    ]

    operations = [
        migrations.CreateModel(
            name='Hire',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('payment_pending', models.BooleanField(default=False)),
                ('payment_success', models.BooleanField(default=False)),
                ('date', models.DateTimeField(blank=True, default=datetime.datetime(2021, 1, 9, 7, 41, 36, 18638), null=True)),
                ('Educator', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='hire_client', to='user.educator')),
                ('client', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='hire_client', to='user.clients')),
            ],
        ),
    ]
