from rest_framework import serializers
from Events.models import *

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