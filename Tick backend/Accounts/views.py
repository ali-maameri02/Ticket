from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token  # Update this import
from django.contrib.auth import get_user_model
from .serializers import *
from rest_framework.authtoken.views import ObtainAuthToken
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate
from .models import *
from rest_framework.views import APIView
from rest_framework.generics import *
from rest_framework.permissions import IsAuthenticated

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




class Creditcardview(generics.ListCreateAPIView):
    serializer_class = Creditcardserializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return CreditCard.objects.filter(User=self.request.user)
# import requests

# url = "https://restpilot.paylink.sa/api/auth"

# payload = {
#     "apiId": "APP_ID_1704948301519",
#     "persistToken": False,
#     "secretKey": "b3d4888a-9cfc-3e4a-8c8f-2038ad6fb89a"
# }
# headers = {
#     "accept": "*/*",
#     "content-type": "application/json"
# }

# response = requests.post(url, json=payload, headers=headers)

# print(response.text)

import requests
from django.http import HttpResponse

def send_message_to_waclient(request):
    # Define API endpoint and parameters
    url = 'https://waclient.com/api/send'
    message_data = {
        'message': 'Hello from Django!',
        'instance_id': '609ACF283XXXX',
        'number': '0697983187',
        'access_token': '659ffe9c16ced',
    }
    
    # Send POST request to waclient.com API
    response = requests.post(url, json=message_data)
    
    # Check if request was successful
    if response.status_code == 200:
        # Get response content
        response_data = response.json()  # Assuming response is JSON
        
        # Return response data as HTTP response
        return HttpResponse(response_data, content_type='application/json')
    else:
        return HttpResponse('Failed to send message.')



