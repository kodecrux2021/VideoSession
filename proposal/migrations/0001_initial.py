# Generated by Django 3.1.3 on 2021-01-16 04:47

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Proposal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_requiremennt', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
    ]
