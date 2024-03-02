from django.shortcuts import render
from  Accounts.models import *
from Events.models import *
from Admin.serializers import TicketSerilizer
# Create your views here.
from rest_framework import viewsets,status
from rest_framework import generics, permissions
from Accounts.serializers import *
from  Events.serializers import *
from django.contrib.auth import authenticate
from rest_framework import generics, permissions, status
from rest_framework.permissions import IsAuthenticated
from .serializers import *
class SellTicketView(generics.ListCreateAPIView):
    serializer_class = TicketSerilizer
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access this view

    def get_queryset(self):
        # Filter tickets by the currently authenticated user
        return Ticket.objects.filter(seller=self.request.user)

    def perform_create(self, serializer):
        # Set the seller field of the ticket to the currently authenticated user
        serializer.save(seller=self.request.user)

class Manageorders(generics.ListAPIView):
    serializer_class = OrderSerilizer
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access this view

    def get_queryset(self):
        # Filter tickets by the currently authenticated user
        return Order.objects.filter(seller=self.request.user)
class CheckNotificationsView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access this view

    def get_queryset(self):
        # Filter tickets by the currently authenticated user
        return Notifications.objects.filter(Receiver=self.request.user)


class Updateorderstatus(generics.RetrieveUpdateAPIView):
    serializer_class = OrderUpdateSerilizer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter tickets by the currently authenticated user
        return Order.objects.filter(seller=self.request.user)

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        instance = self.get_object()
        if instance.status == 'Confirmed':
            # Create notification for the buyer
            message = f'Your order for ticket {instance.ticket.id} has been confirmed.'
            notification_data = {'Receiver': instance.ticket.buyer.id, 'message': message}
            notification_serializer = NotificationSerializer(data=notification_data)
            if notification_serializer.is_valid():
                notification_serializer.save()
        return response