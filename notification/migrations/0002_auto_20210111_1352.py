# Generated by Django 3.1.3 on 2021-01-11 13:52

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('notification', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='notification',
            old_name='accepted',
            new_name='seen_by',
        ),
        migrations.RemoveField(
            model_name='notification',
            name='datetime',
        ),
        migrations.RemoveField(
            model_name='notification',
            name='recieved_by',
        ),
        migrations.RemoveField(
            model_name='notification',
            name='sent_by',
        ),
        migrations.AddField(
            model_name='notification',
            name='created_at',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2021, 1, 11, 13, 52, 31, 724950), null=True),
        ),
        migrations.AddField(
            model_name='notification',
            name='users',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='users_notification', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='Request',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('datetime', models.DateTimeField(blank=True, default=datetime.datetime(2021, 1, 11, 13, 52, 31, 724276), null=True)),
                ('accepted', models.BooleanField(default=False)),
                ('recieved_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='recieved_by_notification', to=settings.AUTH_USER_MODEL)),
                ('sent_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sent_by_notification', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='notification',
            name='request',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='notification_request', to='notification.request'),
        ),
    ]
