from django.contrib import admin
from .models import Users
from .models import Customers
from .models import Merchants
from .models import Subscription

# Register your models here.
admin.site.register(Users)
admin.site.register(Customers)
admin.site.register(Merchants)
admin.site.register(Subscription)
