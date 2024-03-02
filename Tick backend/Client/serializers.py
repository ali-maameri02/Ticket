# serializers.py
from rest_framework import serializers
from Events.models import Order
from Accounts.serializers import *
class OrderSerializer(serializers.ModelSerializer):
    # total_price = serializers.SerializerMethodField()  # Add a SerializerMethodField for total_price

    class Meta:
        model = Order
        exclude = ['status']  # Exclude the 'status' field
    #     read_only_fields = ['total_price']  # Make 'total_price' read-only

    # def get_total_price(self, obj):
    #     return obj.total_price
