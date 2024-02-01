from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
urlpatterns = [
    path('', SellTicketView.as_view(), name='Sell_ticket'),
]