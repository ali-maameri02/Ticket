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
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.db.models import Count
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
from django.utils import timezone
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
                # Create TicketRefused instance
                TicketRefused.objects.create(
                    seller=instance.seller,  # Use the correct foreign key field name
                    event=instance.event,
                    quantity=instance.quantity,
                    sold=instance.sold,
                    Row=instance.Row,
                    Section=instance.Section,
                    buyer=instance.buyer,
                    document=instance.document,
                    price=instance.price,
                )
                # Delete the ticket
                instance.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
        serializer.save()
class TciketListview(generics.ListAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerilizer


class TciketRefusedListview(generics.ListAPIView):
    queryset = TicketRefused.objects.all()
    serializer_class = TicketRefusedSerilizer

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



def calculate_statistics(request):
    total_sales = Ticket.objects.filter(sold=True).count()
    total_orders = Order.objects.count()
    total_users = CustomUser.objects.count()
    total_tickets = Ticket.objects.count()
    statistics = {
        'total_sales': total_sales,
        'total_orders': total_orders,
        'total_users': total_users,
        'total_tickets': total_tickets,
        # Add more statistics here
    }

    return JsonResponse(statistics)

@api_view(['GET'])
def ticket_statistics(request):
    # Aggregate ticket statuses
    ticket_data = Ticket.objects.values('status').annotate(count=Count('status'))

    # Format the data for the pie chart
    pie_data = {
        'Blocked': 0,
        'Done': 0,
        'In Progress': 0,
    }

    # Update pie_data with aggregated ticket counts
    for item in ticket_data:
        if item['status'] == 'Refused':
            pie_data['Blocked'] += item['count']
        elif item['status'] == 'Accepted':
            pie_data['Done'] += item['count']
        else:
            pie_data['In Progress'] += item['count']

    return Response(pie_data)


@csrf_exempt
def sales_and_users_data(request):
    # Get the current year
    current_year = timezone.now().year

    # Initialize dictionaries to store sales and users data for each month
    sales_data = {}
    users_data = {}

    # Get sales data for each month of the current year
    for month in range(1, 13):
        start_date = datetime(current_year, month, 1, 0, 0, tzinfo=timezone.utc)
        
        # Handle December differently
        if month == 12:
            end_date = datetime(current_year + 1, 1, 1, 0, 0, tzinfo=timezone.utc)
        else:
            end_date = datetime(current_year, month + 1, 1, 0, 0, tzinfo=timezone.utc)
        
        sales_count = Ticket.objects.filter(date_added__gte=start_date, date_added__lt=end_date,sold=True).count()
        user_count = Token.objects.filter(created__gte=start_date).count()

        sales_data[start_date.strftime('%Y-%m-%d')] = sales_count
        users_data[start_date.strftime('%Y-%m-%d')] = user_count

    # Return the data as JSON response
    data = {
        'salesData': sales_data,
        'usersData': users_data,
    }

    return JsonResponse(data)
