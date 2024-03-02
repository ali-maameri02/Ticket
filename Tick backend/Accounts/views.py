from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token  # Update this import
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, LoginSerializer , UserDataSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate
from .models import *
from rest_framework.views import APIView
from rest_framework.generics import *
class UserSignUpView(CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Extract username from email
        email = serializer.validated_data['email']
        username = CustomUser.objects.get_username_from_email(email)

        # Set username in serializer
        serializer.validated_data['username'] = username

        self.perform_create(serializer)
        user = serializer.instance
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user_id': user.id, 'email': user.email}, status=status.HTTP_201_CREATED)
class UserLoginView(APIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            serializer = self.serializer_class(data=request.data, context={'request': request})
            serializer.is_valid(raise_exception=True)
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']

            user = None

            if '@' in username:
                try:
                    user = CustomUser.objects.get(email=username)
                except ObjectDoesNotExist:
                    pass

            if not user:
                user = authenticate(username=username, password=password)

            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': token.key, 'user_id': user.id, 'username': user.username}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .serializers import UserSerializer, UserDataSerializer

class GetUserData(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        user_serializer = UserSerializer(user)
        custom_user_serializer = UserDataSerializer(user)
        
        user_data = {
            'username': user.username,
            'email': user.email,
            'isActive': user.is_active,
            'isStaff': user.is_staff,
            'gender': user.gender,
            'profile_picture': user.profile_picture.url if user.profile_picture else None, 
            'address': user.address,
            'first_name': user.first_name,
            'last_name': user.last_name,
        }

        custom_user_data = custom_user_serializer.data
        
        return Response(
            { 
                'message': 'User data retrieved successfully',
                'user_info': user_data,
                'custom_user_info': custom_user_data,
            },
            status=status.HTTP_200_OK
        )


  