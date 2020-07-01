# Generated by Django 3.0.7 on 2020-06-30 09:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SignUp', '0020_auto_20200630_0956'),
    ]

    operations = [
        migrations.CreateModel(
            name='DjangoMigrations',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('app', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('applied', models.DateTimeField()),
            ],
            options={
                'db_table': 'django_migrations',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='SignupPhonemodel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mobile', models.IntegerField(db_column='Mobile')),
                ('isverified', models.BooleanField(db_column='isVerified')),
            ],
            options={
                'db_table': 'SignUp_phonemodel',
                'managed': False,
            },
        ),
        migrations.DeleteModel(
            name='Subscription',
        ),
    ]
