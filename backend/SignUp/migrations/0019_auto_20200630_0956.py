# Generated by Django 3.0.7 on 2020-06-30 09:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('SignUp', '0018_djangomigrations_signupphonemodel'),
    ]

    operations = [
        migrations.DeleteModel(
            name='DjangoMigrations',
        ),
        migrations.DeleteModel(
            name='SignupPhonemodel',
        ),
    ]
