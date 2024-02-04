from rest_framework import serializers
from Events.models import *
from Accounts.models import *

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'datetime', 'deadline', 'description', 'place', 'cover_picture', 'stadium', 'theater']

class StadiumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stadium
        fields = ['id', 'name', 'address', 'cover']

class TheaterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theater
        fields = ['id', 'name', 'address', 'cover']



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"

class TicketSerilizer(serializers.ModelSerializer):
    
    class Meta :
        model = Ticket
        fields = "__all__"
class TicketRefusedSerilizer(serializers.ModelSerializer):
    
    class Meta :
        model = TicketRefused
        fields = "__all__" 
class TicketupdateSerilizer(serializers.ModelSerializer):
    
    class Meta :
        model = Ticket
        # fields = "__all__"
        exclude = ["document"]