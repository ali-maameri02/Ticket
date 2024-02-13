# views.py
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from Events.models import *
from .serializers import OrderSerializer
from Accounts.serializers import *
from rest_framework.response import Response
from rest_framework import status
class PlaceOrderView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter orders by the currently authenticated user as the buyer
        return Order.objects.filter(buyer=self.request.user)

    def create(self, request, *args, **kwargs):
        # Create a mutable copy of request.data
        mutable_data = request.data.copy()
        
        # Set the buyer field to the logged-in user
        mutable_data['buyer'] = self.request.user.pk  # Set the buyer ID to the logged-in user's ID

        serializer = self.get_serializer(data=mutable_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        # Retrieve the seller associated with the order
        seller_id = serializer.validated_data['seller'].pk
        # Create a notification for the seller
        message = f'New order placed by user {request.user.username}'
        notification_data = {'Receiver': seller_id, 'message': message}
        notification_serializer = NotificationSerializer(data=notification_data)
        if notification_serializer.is_valid():
            notification_serializer.save()

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
class CheckNotificationsView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access this view

    def get_queryset(self):
        # Filter tickets by the currently authenticated user
        return Notifications.objects.filter(Receiver=self.request.user)

