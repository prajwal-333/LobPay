# Generated by Django 3.0.7 on 2020-06-20 22:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('SignUp', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='phonemodel',
            name='counter',
        ),
    ]
