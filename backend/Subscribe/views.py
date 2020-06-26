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
        cid = 1
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
        s = Subscription(cid=Customers.objects.get(id=cid), mid=Merchants.objects.get(id=mid))
        s.save()
        print(s.cid)
        print(s.mid)
        return Response({"Subscribed":"true"},status=200)
        
