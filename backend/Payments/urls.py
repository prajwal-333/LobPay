from django.urls import path, include
from .views import makePayment
urlpatterns = [
    path("pay/", makePayment.as_view(), name="Pay"),
]

