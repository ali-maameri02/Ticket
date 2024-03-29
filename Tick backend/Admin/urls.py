from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'events', EventViewSet)

# The API URLs are now determined automatically by the router.
# Additionally, we include the login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
]
# Define your urlpatterns
urlpatterns = [
    # Include the URLs generated by the router
    path('', include(router.urls)),
        path('calculate-statistics/', calculate_statistics, name='calculate_statistics'),
        path('ticket_statistics/', ticket_statistics, name='ticket_statistics'),
            path('sales_and_users_data/', sales_and_users_data, name='sales_and_users_data'),
    # Your other URL patterns
    path('event/', EventListCreateView.as_view(), name='event-list-create'),
    path('users/', UserslistView.as_view(), name='users-list-create'),
    path('user/<int:pk>/', UserRetreivedestroyView.as_view(), name='users-list-create'),
    path('event/<int:pk>/', EventRetrieveUpdateDestroyView.as_view(), name='event-retrieve-update-destroy'),
    path('stadiums/', StadiumListView.as_view(), name='stadium-list-create'),
    path('stadiums/<int:pk>/', StadiumRetrieveDestroyView.as_view(), name='stadium-retrieve-destroy'),
    path('theaters/', TheaterListView.as_view(), name='theater-list-create'),
    path('theaters/<int:pk>/', TheaterRetrieveDestroyView.as_view(), name='theater-retrieve-destroy'),
    path('Ticket/<int:pk>/', TicketUpdateView.as_view(), name='ticket-retrieve-destroy'),
    path('Tickets/', TciketListview.as_view(), name='tickets'),
    path('TciketRefused/', TciketRefusedListview.as_view(), name='TciketRefused'),
    
    path('Login/', AdminLoginView.as_view(), name='Login'),
]