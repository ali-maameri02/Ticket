# Generated by Django 4.2.3 on 2024-01-31 12:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Events', '0003_alter_stadium_address_alter_stadium_cover_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticket',
            name='status',
            field=models.CharField(blank=True, choices=[('Refused', 'Refused'), ('Accepted', 'Accepted')], default=None, max_length=10),
        ),
    ]
