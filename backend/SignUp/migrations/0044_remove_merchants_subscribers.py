# Generated by Django 3.0.7 on 2020-07-01 12:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('SignUp', '0043_auto_20200701_1158'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='merchants',
            name='subscribers',
        ),
    ]