# Generated by Django 4.2.3 on 2024-02-26 14:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Accounts', '0005_alter_creditcard_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='phone_number',
            field=models.TextField(blank=True, default=None, max_length=20, null=True),
        ),
    ]
