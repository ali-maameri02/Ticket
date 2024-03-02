from rest_framework import serializers
from Events.models import *


class OrderSerilizer(serializers.ModelSerializer):
     class Meta:
        model = Order
        fields = "__all__"
class OrderUpdateSerilizer(serializers.ModelSerializer):
     class Meta:
        model = Order
        fields =('id','status') 
