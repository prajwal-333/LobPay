from django.urls import path, include
from .views import merchantList
from .views import customerList
from .views import addSubscription
from .views import customerCheckoutId
urlpatterns = [
    path("customerlist/<mid>", customerList.as_view(), name="Customers List"),
    path("merchantlist/", merchantList.as_view(), name="Shops List"), 
    path("<cid>/<mid>", addSubscription.as_view(), name="Subscribe User"),
    path("obtainCheckout/<cid>", customerCheckoutId.as_view(), name="Get checkout id"),
]

