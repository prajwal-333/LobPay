from django.urls import path, include
from .views import merchantList
from .views import addSubscription
urlpatterns = [
    path("list/<cid>", merchantList.as_view(), name="Shops List"),
    path("<cid>/<mid>", addSubscription.as_view(), name="Subscribe User"),
]

