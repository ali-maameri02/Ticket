# urls.py
from django.urls import path
from .views import UserSignUpView, UserLoginView ,GetUserData

urlpatterns = [
    path('signup/', UserSignUpView.as_view(), name='user-signup'),
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('get-user-data/', GetUserData.as_view(), name='get_user_data'),
]
