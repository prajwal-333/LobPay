from django.urls import path, include
from .views import getPhoneNumberRegistered
from .views import signIn

urlpatterns = [
    path("signin/", signIn.as_view(), name="Sign in"),
    path("signup/", getPhoneNumberRegistered.as_view(), name="OTP Gen"),
]