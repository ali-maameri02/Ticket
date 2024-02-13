from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
urlpatterns = [
    path('', SellTicketView.as_view(), name='Sell_ticket'),
    path('Orders/', Manageorders.as_view(), name='Sell_ticket'),
    
    path('updateorder/<int:pk>/', Updateorderstatus.as_view(), name='updateorder'),
         path('Notifications/', CheckNotificationsView.as_view(), name='Notifications'),
]