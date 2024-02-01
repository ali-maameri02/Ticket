from rest_framework import generics, permissions
from Events.models import Event
from .serializers import *
from .permissions import IsStaffUser
from rest_framework import viewsets,status
from rest_framework.views import APIView
from Accounts.serializers import *
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token  # Update this import

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


class UserslistView(generics.ListAPIView):
    queryset= CustomUser.objects.all()
    serializer_class = UserSerializer 

class UserRetreivedestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

from rest_framework.response import Response
class TicketUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketupdateSerilizer

    def perform_update(self, serializer):
        instance = serializer.instance
        if 'status' in serializer.validated_data:
            status_value = serializer.validated_data['status']
            if status_value == 'Refused':
                instance.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
        serializer.save()
class TciketListview(generics.ListAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerilizer


class AdminLoginView(APIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        user = None

        if '@' in username:
            try:
                user = CustomUser.objects.get(email=username)
            except ObjectDoesNotExist:
                pass

        if not user:
            user = authenticate(username=username, password=password)

        if user and user.is_staff:  # Check if the user is staff
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user_id': user.id, 'username': user.username}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials or user is not staff'}, status=status.HTTP_401_UNAUTHORIZED)