# views.py
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from Events.models import Order
from .serializers import OrderSerializer
from Accounts.serializers import *
class PlaceOrderView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        order_data = response.data
        # Retrieve the seller associated with the order
        seller_id = order_data.get('seller')
        # Create a notification for the seller
        message = f'New order placed by user {request.user.username}'
        notification_data = {'Receiver': seller_id, 'message': message}
        notification_serializer = NotificationSerializer(data=notification_data)
        if notification_serializer.is_valid():
            notification_serializer.save()
        return response
    

class CheckNotificationsView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access this view

    def get_queryset(self):
        # Filter tickets by the currently authenticated user
        return Notifications.objects.filter(Receiver=self.request.user)

