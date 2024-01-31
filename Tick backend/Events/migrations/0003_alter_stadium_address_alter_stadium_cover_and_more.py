# Generated by Django 4.2.3 on 2024-01-26 14:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Events', '0002_auto_20240126_1527'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stadium',
            name='address',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='stadium',
            name='cover',
            field=models.ImageField(null=True, upload_to='stadium_covers/'),
        ),
        migrations.AlterField(
            model_name='theater',
            name='address',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='theater',
            name='cover',
            field=models.ImageField(null=True, upload_to='theater_covers/'),
        ),
    ]