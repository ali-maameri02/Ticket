# Generated by Django 4.2.3 on 2024-01-31 14:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Events', '0004_alter_ticket_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='ticket',
            name='Row',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='ticket',
            name='Section',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='ticket',
            name='price',
            field=models.IntegerField(default=None, null=True),
        ),
    ]
