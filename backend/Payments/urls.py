from django.urls import path, include
from .views import makePayment
from .views import AuthPayment

urlpatterns = [
    path("auth/", AuthPayment.as_view(), name="Auth"),
    path("pay/", makePayment.as_view(), name="Pay"),
]

