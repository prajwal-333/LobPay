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
    def post(request):
        KEY = 'BqbsKmGUTe303suAN3GAqZTV4LgSlVLz'
        cid = request.data["cid"]
        lat = request.data["lat"]
        long = request.data["long"]
        fro = str(lat)+'%2C+'+str(long)
        # print(fro)
        merch_set= Merchants.objects.values()
        merch_data = list(merch_set.values('id','address','pin','subscribers'))
        for i,j in zip(merch_set,merch_data):
            # print(i,j)
            subs = Subscription.objects.filter(cid=cid,mid=i['id_id'])
          
            to = str(i['lat'])+'%2C+'+str(i['long'])
            # print(to)
            url = "https://www.mapquestapi.com/directions/v2/route?key="+KEY+"&from="+fro+"&to="+to+"&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false&unit=k"
            response = requests.request("GET", url)
            # print(response.json())
            dist = response.json()["route"]["distance"]
            j.update({"distance": dist})
            if subs:
                j.update({"subscribed": "true"})
            else:
                j.update({"subscribed": "false"})
        return JsonResponse(merch_data, safe=False)


class addSubscription(APIView):
    @staticmethod
    def get(request,cid,mid):
        print(cid,mid)
        try:
            s = Subscription.objects.get(cid=Customers.objects.get(id=cid), mid=Merchants.objects.get(id=mid))
            return Response({"Subscribed": "Already subscribed"}, status=409)
        except ObjectDoesNotExist:
            s = Subscription(cid=Customers.objects.get(id=cid), mid=Merchants.objects.get(id=mid))
            s.save()
            mer = Merchants.objects.get(id=Users.objects.get(id=mid))
            mer.subscribers = mer.subscribers+1
            mer.save()
            return Response({"Subscribed":"true"},status=200)

    @staticmethod
    def delete(request,cid,mid):
        try:
            s = Subscription.objects.get(cid=Customers.objects.get(id=cid), mid=Merchants.objects.get(id=mid))
            s.delete()
            mer = Merchants.objects.get(id=Users.objects.get(id=mid))
            mer.subscribers = mer.subscribers-1
            mer.save()
            return Response({"Subscription deleted":"true"},status=200)
        except ObjectDoesNotExist:
            return Response({"Subscription status":"Does Not exist"},status=409)


class customerList(APIView):
    @staticmethod
    def get(request, mid):
        subs = list(Subscription.objects.filter(mid=mid))

        customerData = []
        for sub in subs:
            customer = Customers.objects.get(id=sub.cid.id)
            # print(customer.id.username)
            cus = {}
            cus["username"] = customer.id.username
            cus["id"] = customer.id.id
            customerData.append(cus)
        
        return JsonResponse(customerData, safe=False)


class customerCheckoutId(APIView):
    @staticmethod
    def get(request, cid):
        try:
            s = Customers.objects.get(id=cid)
            return Response({"Checkout Obtain":"success","checkout_id":s.checkout_id},status=200)
        except:
            return Response({"Checkout Obtain":"failed"},status=400)

    @staticmethod
    def put(request, cid):
        try:
            s = Customers.objects.get(id=cid)
            s.checkout_id = request.data["checkout_id"]
            # print(request.data["checkout_id"])
            s.save()
            return Response({"Set checkout":"success"},status=200)
        except:
            return Response({"Issue":"Customer not subscribed to the merchant"},status=400)


