from django.urls import path, include
from .views import fillInventory
from .views import fillMerchant
from .views import createBills

urlpatterns = [
    path("inventory/", fillInventory.as_view(), name="Fill the inventory table"),
    path("merchantInventory/<mid>", fillMerchant.as_view(), name="Fill the merchant's inventory status"),
    path("bills/<cid>/<mid>",createBills.as_view(), name="Customer's bills")
]

