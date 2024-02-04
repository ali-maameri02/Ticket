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
    def __str__(self) :
        return self.title
class Ticket(models.Model):
    seller = models.ForeignKey(CustomUser, related_name='tickets_for_sale', on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    status = models.CharField(choices=[('Refused', 'Refused'), ('Accepted', 'Accepted')], max_length=10,default=None,blank=True)
    sold = models.BooleanField(default=False)
    Row = models.CharField(max_length=50, blank=True, null=True)
    Section = models.CharField(max_length=50, blank=True, null=True)
    buyer = models.ForeignKey(CustomUser, related_name='bought_tickets', null=True, blank=True, on_delete=models.SET_NULL)
    document = models.FileField(upload_to='ticket_documents/')
    price = models.IntegerField(default=None, null=True)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Ticket of {self.event.title} event added by {self.seller.username}'

class TicketRefused(models.Model):
    seller = models.ForeignKey(CustomUser, related_name='refused_tickets_for_sale', on_delete=models.CASCADE,null=True,blank=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE,null=True,blank=True)
    quantity = models.PositiveIntegerField(null=True,blank=True)
    sold = models.BooleanField(default=False)
    Row = models.CharField(max_length=50, blank=True, null=True)
    Section = models.CharField(max_length=50, blank=True, null=True)
    buyer = models.ForeignKey(CustomUser, related_name='refused_bought_tickets', null=True, blank=True, on_delete=models.SET_NULL)
    document = models.FileField(upload_to='ticket_documents/',null=True,blank=True)
    price = models.IntegerField(default=None, null=True)
    date_refused = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Ticket of {self.seller} - refused'

class Payment(models.Model):
    method =  models.CharField(choices=[('Paypal', 'Paypal'), ('Mada', 'Mada')], max_length=50,default=None,blank=True)
    date = models.DateTimeField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE)
    Amount = models.IntegerField(default=None)


class Order(models.Model):
    seller = models.ForeignKey(CustomUser, related_name='orders', on_delete=models.CASCADE)
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(null=True)  # New field for quantity
    date_ordered = models.DateTimeField(auto_now_add=True)
    status = models.CharField(choices=[('In progress', 'In progress'), ('Confirmed', 'Confirmed')], max_length=50, default='In progress', blank=True)

    # def save(self, *args, **kwargs):
    #     # Calculate total_price before saving the order
    #     self.total_price = self.quantity * self.ticket.price
    #     super().save(*args, **kwargs)

    # @property
    # def total_price(self):
    #     return getattr(self, '_total_price', None)

    # @total_price.setter
    # def total_price(self, value):
    #     self._total_price = value