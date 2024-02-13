# urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('signup/', UserSignUpView.as_view(), name='user-signup'),
    path('', UserLoginView.as_view(), name='user-login'),
    path('creditacard/',Creditcardview.as_view(), name='user-login'),
    path('send_message_to_waclient/',send_message_to_waclient,name="send_message_to_waclient")
]
