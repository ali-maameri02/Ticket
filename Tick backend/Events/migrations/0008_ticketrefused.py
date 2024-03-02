# Generated by Django 4.2.3 on 2024-02-04 20:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Events', '0007_order_quantity'),
    ]

    operations = [
        migrations.CreateModel(
            name='TicketRefused',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_refused', models.DateTimeField(auto_now_add=True)),
                ('Ticket', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Events.ticket')),
            ],
        ),
    ]
