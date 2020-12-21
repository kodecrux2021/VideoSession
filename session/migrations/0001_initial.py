# Generated by Django 3.1.3 on 2020-12-18 16:41

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('technology', '0001_initial'),
        ('user', '0003_auto_20201218_1641'),
    ]

    operations = [
        migrations.CreateModel(
            name='Session',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(blank=True, default=datetime.datetime(2020, 12, 18, 16, 41, 59, 201342), null=True)),
                ('audio', models.FileField(null=True, upload_to='videos/', verbose_name='audio')),
                ('video', models.FileField(null=True, upload_to='videos/', verbose_name='video')),
                ('educator', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='bill', to='user.educator')),
                ('topic', models.ManyToManyField(to='technology.Topic')),
            ],
        ),
    ]
