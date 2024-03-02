from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import *
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'password')  # Change 'username' to 'email'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = get_user_model().objects.create_user(email=validated_data['email'], password=validated_data['password'])
        return user
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notifications
        fields = '__all__'
<<<<<<< HEAD
        
class UserDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'username', 'first_name', 'last_name', 'is_active', 'is_staff', 'profile_picture', 'gender', 'address')
=======


class Creditcardserializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCard
        fields = '__all__'


class WhatsAppMessageSerializer(serializers.Serializer):
    number = serializers.CharField()
    message = serializers.CharField()
>>>>>>> ebe37f78e27f09ddfbec493f86b264658371d4e2
