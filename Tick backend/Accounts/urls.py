# urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('signup/', UserSignUpView.as_view(), name='user-signup'),
    path('', UserLoginView.as_view(), name='user-login'),
    path('creditacard/',Creditcardview.as_view(), name='user-login'),
# path('send_whatsapp_confirmation/', send_whatsapp_confirmation, name='send_whatsapp_message'),
# path('send_email_confirmation/', send_whatsapp_confirmation, name='send_whatsapp_message'),
]
