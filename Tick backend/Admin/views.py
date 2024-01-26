from rest_framework import generics, permissions
from Events.models import Event
from .serializers import *
from .permissions import IsStaffUser
from rest_framework import viewsets
class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    # permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]  # or permissions.IsStaffUser if you've defined it

class EventListCreateView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    # permission_classes = [permissions.IsAuthenticated, IsStaffUser]

class EventRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    # permission_classes = [permissions.IsAuthenticated, IsStaffUser]
class StadiumListView(generics.ListAPIView):
    queryset = Stadium.objects.all()
    serializer_class = StadiumSerializer

class StadiumRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    queryset = Stadium.objects.all()
    serializer_class = StadiumSerializer

class TheaterListView(generics.ListAPIView):
    queryset = Theater.objects.all()
    serializer_class = TheaterSerializer

class TheaterRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    queryset = Theater.objects.all()
    serializer_class = TheaterSerializer