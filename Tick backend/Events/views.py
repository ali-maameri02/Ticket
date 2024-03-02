from rest_framework import generics, permissions
from .models import *
from .serializers import *
# from .permissions import IsStaffUser
from rest_framework import viewsets,status
from rest_framework.views import APIView
from Accounts.serializers import *
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token  # Update this import
from rest_framework.decorators import api_view
from django.http import JsonResponse

class EventListView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    # permission_classes = [permissions.IsAuthenticated, IsStaffUser]
