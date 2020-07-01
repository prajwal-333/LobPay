from django.contrib import admin
from .models import Users
from .models import Customers
from .models import Merchants
from .models import Subscription
from .models import Inventory
from .models import Invoice
from .models import Invoiceitem
from .models import MerchantsInventory

# Register your models here.
admin.site.register(Users)
admin.site.register(Customers)
admin.site.register(Merchants)
admin.site.register(Subscription)
admin.site.register(Inventory)
admin.site.register(Invoice)
admin.site.register(Invoiceitem)
admin.site.register(MerchantsInventory)