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
    seller_username = serializers.ReadOnlyField(source='seller.username')
    seller_email = serializers.ReadOnlyField(source='seller.email')
    seller_profile_picture = serializers.ImageField(source='seller.profile_picture', read_only=True)
    status_display = serializers.CharField(source='get_status_display')

    class Meta:
        model = Ticket
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.status != 'Accepted' and instance.status != 'Refused':
            data['status_display'] = 'Progress'
        return data


class TicketRefusedSerilizer(serializers.ModelSerializer):
    
    class Meta :
        model = TicketRefused
        fields = "__all__" 
class TicketupdateSerilizer(serializers.ModelSerializer):
    
    class Meta :
        model = Ticket
        # fields = "__all__"
        exclude = ["document"]