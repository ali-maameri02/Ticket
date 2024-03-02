from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token  # Update this import
from django.contrib.auth import get_user_model
<<<<<<< HEAD
from .serializers import UserSerializer, LoginSerializer , UserDataSerializer
=======
from .serializers import *
>>>>>>> ebe37f78e27f09ddfbec493f86b264658371d4e2
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


<<<<<<< HEAD
  
=======

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

# Define API endpoint URLs
CREATE_INSTANCE_URL = 'https://waclient.com/api/createinstance'
GET_QR_CODE_URL = 'https://waclient.com/api/getqrcode'
SET_WEBHOOK_URL = 'https://waclient.com/api/setwebhook'
REBOOT_INSTANCE_URL = 'https://waclient.com/api/reboot'
RESET_INSTANCE_URL = 'https://waclient.com/api/resetinstance'
RECONNECT_URL = 'https://waclient.com/api/reconnect'
SEND_MESSAGE_URL = 'https://waclient.com/api/send'

# Define access token and instance ID
ACCESS_TOKEN = '659ffe9c16ced'
INSTANCE_ID = '65A2AAFA2AE87'

def create_instance():
    params = {'access_token': ACCESS_TOKEN}
    response = requests.post(CREATE_INSTANCE_URL, params=params)
    return response.json()

# def get_qr_code():
#     params = {'instance_id': INSTANCE_ID, 'access_token': ACCESS_TOKEN}
#     response = requests.post(GET_QR_CODE_URL, params=params)
#     return response.json()

# def set_webhook(webhook_url):
#     params = {
#         'webhook_url': webhook_url,
#         'enable': 'true',
#         'instance_id': INSTANCE_ID,
#         'access_token': ACCESS_TOKEN
#     }
#     response = requests.post(SET_WEBHOOK_URL, params=params)
#     return response.json()

# def reboot_instance():
#     params = {'instance_id': INSTANCE_ID, 'access_token': ACCESS_TOKEN}
#     response = requests.post(REBOOT_INSTANCE_URL, params=params)
#     return response.json()

# def reset_instance():
#     params = {'instance_id': INSTANCE_ID, 'access_token': ACCESS_TOKEN}
#     response = requests.post(RESET_INSTANCE_URL, params=params)
#     return response.json()

# def reconnect():
#     params = {'instance_id': INSTANCE_ID, 'access_token': ACCESS_TOKEN}
#     response = requests.post(RECONNECT_URL, params=params)
#     return response.json()
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from .serializers import WhatsAppMessageSerializer
# import requests

# class SendWhatsAppMessage(APIView):
#     def post(self, request, format=None):
#         serializer = WhatsAppMessageSerializer(data=request.data)
#         if serializer.is_valid():
#             phone_number = serializer.validated_data.get('number')
#             message = serializer.validated_data.get('message')
#             instance_id = "65A2AAFA2AE87"  # Update instance ID
#             access_token = "659ffe9c16ced"  # Update access token
#             response = self.send_whatsapp_message(phone_number, message, instance_id, access_token)
#             return Response(response)
#         else:
#             return Response(serializer.errors, status=400)

#     def send_whatsapp_message(self, phone_number, message, instance_id, access_token):
#         url = 'https://waclient.com/api/send'
#         payload = {
#             'number': phone_number,
#             'type': 'text',
#             'message': message,
#             'instance_id': instance_id,
#             'access_token': access_token
#         }
#         headers = {'Content-Type': 'application/json'}
#         response = requests.post(url, json=payload, headers=headers)
#         return response.json()
# from twilio.rest import Client
# from django.views.decorators.csrf import csrf_exempt
# account_sid = 'ACab4b57094c5c465f7e7ec5a5755d3ef1'
# auth_token = 'c3c74cf1b8d5f67589883baeed5df13e'
# client = Client(account_sid, auth_token)
# @csrf_exempt
# def send_whatssap(request):
#     message = request.POST["Body"]
#     sender_name = request.POST["ProfileName"]
#     sender_number = request.POST["From"]
#     if message == "hi":
#         client.messages.create(
#   from_='whatsapp:+14155238886',
#   body="Hi {},Your appointment is coming up on July 21 at 3PM".format(sender_name),
#   to=sender_number
# )
#     print(request.POST)
#     return HttpResponse("hello")

# from twilio.rest import Client
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import EmailMessage
# ## Import necessary modules
# from django.http import HttpResponse, JsonResponse
# from twilio.rest import Client
import json
# import requests

# # Define your Twilio credentials and Twilio client
# twilio_account_sid = 'your_twilio_account_sid'
# twilio_auth_token = 'your_twilio_auth_token'
# twilio_sender_number = 'your_twilio_sender_number'
# client = Client(twilio_account_sid, twilio_auth_token)

# Define your WhatsApp API parameters
whatsapp_access_token = "659ffe9c16ced"
whatsapp_instance_id = "65A2AAFA2AE87"

@csrf_exempt
def send_whatsapp_confirmation(sender_name, sender_number, media_url=None):
    try:
        if media_url:
            confirmation_message = f"Hi {sender_name}, your ticket order has been confirmed. " \
                                    f"You can download it now from {media_url}."
        else:
            confirmation_message = f"Hi {sender_name}, your ticket order has been confirmed. " \
                                    f"You can download it now from funpass.io."

        # Define the parameters for sending the message
        message_data = {
            "number": sender_number,  # Update with the recipient's phone number
            "type": "media",
            "message": confirmation_message,
            "media_url": media_url,
            "instance_id": whatsapp_instance_id,  # Update with your WhatsApp instance ID
            "access_token": whatsapp_access_token
        }

        # Convert the parameters to JSON format
        json_message_data = json.dumps(message_data)

        # Send the POST request to send the message
        url = "https://waclient.com/api/send"
        headers = {'Content-Type': 'application/json'}

        response = requests.post(url, data=json_message_data, headers=headers)

        # Check if the request was successful
        if response.status_code == 200:
            print("WhatsApp confirmation message sent successfully.")
            return HttpResponse("WhatsApp confirmation message sent successfully.")
        else:
            print(f"Failed to send WhatsApp confirmation message. Status code: {response.status_code}")
            return HttpResponse(f"Failed to send WhatsApp confirmation message. Status code: {response.status_code}", status=500)
    except Exception as e:
        # Log any exceptions that occur
        print(f"An error occurred: {str(e)}")
        return HttpResponse(f"An error occurred: {str(e)}", status=500)



# EMAIL_HOST = 'smtp.hostinger.com'
# EMAIL_PORT = 465
# EMAIL_HOST_USER = 'info@funpass.io'
# EMAIL_HOST_PASSWORD = 'Funpass@2023'
# EMAIL_USE_TLS = True  # Since we are using SSL

from django.core.mail import send_mail, EmailMessage
from django.http import HttpResponse
from PIL import Image
from io import BytesIO
from django.contrib import messages
import logging
from django.conf import settings
logger = logging.getLogger(__name__)

def send_email_confirmation(sender_name, sender_email):
    try:
        # Create the email message
        subject = 'Ticket Order Confirmation'
        message = f"Hi {sender_name}, your ticket order has been confirmed."
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [sender_email]

        email = EmailMessage(subject, message, from_email, recipient_list)
        print(email)
        # Send the email
        send_mail( subject, message, from_email, recipient_list )
        email.send()
        logger.info(f"Email confirmation sent successfully to {sender_email}")
        return HttpResponse("Email confirmation sent successfully.")
    except Exception as e:
        logger.error(f"Failed to send email confirmation to {sender_email}: {str(e)}")
        return HttpResponse(f"Failed to send email confirmation: {str(e)}", status=500)
>>>>>>> ebe37f78e27f09ddfbec493f86b264658371d4e2
