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
from Accounts.serializers import CreditCard
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

# from twilio.rest import Client
# from django.http import HttpResponse
# from django.views.decorators.csrf import csrf_exempt

# # Initialize the Twilio client
# account_sid = 'ACab4b57094c5c465f7e7ec5a5755d3ef1'
# auth_token = 'c3c74cf1b8d5f67589883baeed5df13e'
# client = Client(account_sid, auth_token)

# # Define the Twilio WhatsApp sender number
# twilio_sender_number = 'whatsapp:+14155238886'
# from twilio.base.exceptions import TwilioRestException
# @csrf_exempt
# def send_whatsapp_confirmation(sender_name, sender_number):
#     try:
#         confirmation_message = f"Hi {sender_name}, your ticket order has been confirmed. " \
#                                 f"You can download it now from funpass.io."

#         # Send the confirmation message using Twilio
#         message = client.messages.create(
#             from_=twilio_sender_number,
#             body=confirmation_message,
#             to=sender_number
#         )
#         print(f"WhatsApp message sent successfully. SID: {message.sid}")
#         return HttpResponse("WhatsApp confirmation message sent successfully.")
#     except TwilioRestException as e:
#         # Log the Twilio exception
#         print(f"Failed to send WhatsApp message: {str(e)}")
#         return HttpResponse(f"Failed to send WhatsApp message: {str(e)}", status=500)
from Accounts.views import send_whatsapp_confirmation,send_email_confirmation
from django.contrib.sites.shortcuts import get_current_site

# Inside your Updateorderstatus view or wherever you need to generate the URLs
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
            # Call the function to send WhatsApp confirmation message
            # Pass the media URL if available
            media_url = str(instance.ticket.document.url) if instance.ticket.document else None
            send_email_confirmation(instance.buyer.username, instance.buyer.email)
            print(instance.buyer.username, instance.buyer.email)
            # Construct absolute URL for media file
            if media_url:
                absolute_media_url = request.build_absolute_uri(media_url)
            else:
                absolute_media_url = None

            send_whatsapp_confirmation(instance.buyer.username, instance.buyer.phone_number, media_url=absolute_media_url)
            
            print(instance.buyer.username, instance.buyer.phone_number, media_url)
           
        return response
