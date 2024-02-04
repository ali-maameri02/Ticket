from django.urls import path, include
# from rest_framework.routers import DefaultRouter
from .views import *

# Create a router and register our viewsets with it.


# The API URLs are now determined automatically by the router.
# Additionally, we include the login URLs for the browsable API.

urlpatterns = [
   path('get_ticket/', PlaceOrderView.as_view(), name='get_ticket'),
   path('Notifications/', CheckNotificationsView.as_view(), name='Notifications'),
]