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

class SellTicketView(generics.ListCreateAPIView):
    serializer_class = TicketSerilizer
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access this view

    def get_queryset(self):
        # Filter tickets by the currently authenticated user
        return Ticket.objects.filter(seller=self.request.user)

    def perform_create(self, serializer):
        # Set the seller field of the ticket to the currently authenticated user
        serializer.save(seller=self.request.user)



