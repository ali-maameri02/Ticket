# urls.py
from django.urls import path
<<<<<<< HEAD
from .views import UserSignUpView, UserLoginView ,GetUserData

urlpatterns = [
    path('signup/', UserSignUpView.as_view(), name='user-signup'),
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('get-user-data/', GetUserData.as_view(), name='get_user_data'),
=======
from .views import *

urlpatterns = [
    path('signup/', UserSignUpView.as_view(), name='user-signup'),
    path('', UserLoginView.as_view(), name='user-login'),
    path('creditacard/',Creditcardview.as_view(), name='user-login'),
# path('send_whatsapp_confirmation/', send_whatsapp_confirmation, name='send_whatsapp_message'),
# path('send_email_confirmation/', send_whatsapp_confirmation, name='send_whatsapp_message'),
>>>>>>> ebe37f78e27f09ddfbec493f86b264658371d4e2
]
