from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework.views import APIView
from SignUp.models import Users
from SignUp.models import Customers
from SignUp.models import Merchants
from SignUp.models import Subscription
from django.http import JsonResponse
import requests
import json

class merchantList(APIView):
    @staticmethod
    def get(request,cid):
        KEY = 'BqbsKmGUTe303suAN3GAqZTV4LgSlVLz'
        cid = 2
        cust_entry = Customers.objects.get(id=cid)
        fro = str(getattr(cust_entry,'pincode'))+'%2C+India'
        merch_data = list(Merchants.objects.values())
        for i in merch_data:
            to = str(i["pincode"])+'%2C+India'
            url = "https://www.mapquestapi.com/directions/v2/route?key="+KEY+"&from="+fro+"&to="+to+"&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false&unit=k"
            response = requests.request("GET", url)
            dist = response.json()["route"]["distance"]
            i.update({"distance": dist})
        return JsonResponse(merch_data, safe=False)

class addSubscription(APIView):
    @staticmethod
    def get(request,cid,mid):
        s = Subscription(cid=Customers.objects.get(id=cid), mid=Merchants.objects.get(id=mid), checkout_id="")
        s.save()
        # print(s.cid)
        # print(s.mid)
        return Response({"Subscribed":"true"},status=200)

class customerList(APIView):
    @staticmethod
    def get(request, mid):
        subs = list(Subscription.objects.filter(mid=mid))

        customerData = []
        for sub in subs:
            customer = Customers.objects.get(id=sub.cid.id)
            print(customer.id.username)
            cus = {}
            cus["username"] = customer.id.username
            cus["id"] = customer.id.id
            customerData.append(cus)
        
        return JsonResponse(customerData, safe=False)


class customerCheckoutId(APIView):
    @staticmethod
    def get(request, cid, mid):
        s = Subscription.objects.get(cid=Customers.objects.get(id=cid), mid=Merchants.objects.get(id=mid))
        try:
            # c = Customers.objects.get(id=cid)
            # m = Merchants.objects.get(id=mid)
            # print(c.id.id,m.id.id)
            s = Subscription.objects.get(cid=Customers.objects.get(id=cid), mid=Merchants.objects.get(id=mid))
            # print(s.checkout_id)
            return Response({"Checkout Obtain":"success","checkout_id":s.checkout_id},status=200)
        except:
            return Response({"Checkout Obtain":"failed"},status=400)

    @staticmethod
    def put(request, cid, mid):
        try:
            s = Subscription.objects.get(cid=Customers.objects.get(id=cid), mid=Merchants.objects.get(id=mid))
            s.checkout_id = request.data["checkout_id"]
            # print(request.data["checkout_id"])
            s.save()
            return Response({"Set checkout":"success"},status=200)
        except:
            return Response({"Issue":"Customer not subscribed to the merchant"},status=400)


