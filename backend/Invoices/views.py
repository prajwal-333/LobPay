from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse
from SignUp.models import Users
from SignUp.models import Customers
from SignUp.models import Merchants
from SignUp.models import Subscription
from SignUp.models import Inventory
from SignUp.models import Invoice
from SignUp.models import Invoiceitem
from SignUp.models import MerchantsInventory
import json
import requests
import datetime
# Create your views here.

class fillMerchant(APIView):
    @staticmethod
    def post(request, mid):
        try:
            mer = Merchants.objects.get(id=mid)
            for item in request.data:
                it = Inventory.objects.get(name=item["name"])
                quantity = item["quantity"]
                # print(it, quantity, mer)
                mer_inv = MerchantsInventory(item_id=it.id, quantity=quantity,mid=mer, price=item["price"])
                mer_inv.save()
            return Response({"Success":"true"}, status=200)
        except:
            return Response({"Success":"false"}, status=409)
    
    @staticmethod
    def get(request, mid):
        send_items = []
        items = list(MerchantsInventory.objects.all())
        for item in items:
            item_inv = Inventory.objects.get(id=item.id)
            item_name = item_inv.name
            item_price = item_inv.price
            quantity = item.quantity
            send_item = {"name":item_name, "price":item_price, "quantity":quantity}
            send_items.append(send_item)
        return JsonResponse(send_items, safe=False)

class createBills(APIView):
    @staticmethod
    def post(request, cid, mid):
        date_today = datetime.date.today

        invoice = Invoice.objects.create(cid=Customers.objects.get(id=cid),total_price=0)
        invoice_id = invoice.id
        total_price=0
        for item in request.data:
            it = Inventory.objects.get(name=item["name"])
            mer = MerchantsInventory.objects.get(mid=mid, item_id=it.id)
            all_piece_price = mer.price*item["quantity"]
            mer.quantity = mer.quantity-item["quantity"]
            mer.save()
            total_price+=all_piece_price
            invoice_item = Invoiceitem.objects.create(inv_id=invoice_id, item_id = it.id, quantity=item["quantity"])
        
        invoice.total_price = total_price
        invoice.save()
    
        return Response({"Success: True"},status=200)


    @staticmethod
    def get(request, cid, mid):
        invoices = list(Invoice.objects.filter(cid = cid))
        send_items_all = []
        for invoice in invoices:
            send_items = []
            inv_items = list(Invoiceitem.objects.filter(inv_id=invoice.id))
            for item in inv_items:
                # print("item id",item.item_id)
                it = Inventory.objects.get(id=item.item_id)
                item_name = it.name
                quantity = item.quantity
                mer = MerchantsInventory.objects.get(mid=mid, item_id=it.id)
                send_item = {"date":invoice.inv_date, "name":item_name, "quantity":quantity,"price":mer.price}
                send_items.append(send_item)
            send_items_all.append(send_items)

        return JsonResponse(send_items_all, safe=False)

class fillInventory(APIView):
    @staticmethod
    def post(request):
        for item in request.data:
            inv = Inventory.objects.create(name = item["name"], price=item["price"])
        
        return Response({"Inventory filled":"Success"},status=200)

    @staticmethod
    def get(request):
        send_items = []
        items = list(Inventory.objects.all())
        for item in items:
            send_item = {"name":item.name, "price":item.price}
            send_items.append(send_item)
        
        return JsonResponse(send_items, safe=False)
