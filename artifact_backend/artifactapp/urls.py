from django.urls import path
from .views import SignupView, LoginView, LogoutView, HealthView, artwork_search

urlpatterns = [
    path('signup', SignupView.as_view(), name='signup'),
    path('login', LoginView.as_view(), name='login'),
    path('logout', LogoutView.as_view(), name='logout'),
    path("", HealthView.as_view(), name="health"),
    path('search', artwork_search, name='artwork_search'),
]