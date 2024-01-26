from django.db import models
from Accounts.models import *
class Stadium(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255,null=True)
    cover = models.ImageField(upload_to='stadium_covers/',null=True)
    def __str__(self):
        return self.name
class Theater(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255,null=True)
    cover = models.ImageField(upload_to='theater_covers/',null=True)
    def __str__(self):
        return self.name
class Event(models.Model):
    title = models.CharField(max_length=255)
    datetime = models.DateTimeField()
    deadline = models.DateTimeField()
    description = models.TextField()
    place = models.CharField(choices=[('Stadium', 'Stadium'), ('Theater', 'Theater')], max_length=10)
    cover_picture = models.ImageField(upload_to='event_covers/')
    stadium = models.ForeignKey(Stadium, null=True, blank=True, on_delete=models.CASCADE)
    theater = models.ForeignKey(Theater, null=True, blank=True, on_delete=models.CASCADE)

class Ticket(models.Model):
    seller = models.ForeignKey(CustomUser, related_name='tickets_for_sale', on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    status = models.CharField(choices=[('Refused', 'Refused'), ('Accepted', 'Accepted')], max_length=10)
    sold = models.BooleanField(default=False)
    buyer = models.ForeignKey(CustomUser, related_name='bought_tickets', null=True, blank=True, on_delete=models.SET_NULL)
    document = models.FileField(upload_to='ticket_documents/')
    date_added = models.DateTimeField(auto_now_add=True)

class Payment(models.Model):
    method = models.CharField(max_length=255)
    date = models.DateTimeField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE)

class Order(models.Model):
    seller = models.ForeignKey(CustomUser, related_name='orders', on_delete=models.CASCADE)
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE)
    date_ordered = models.DateTimeField(auto_now_add=True)