from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework.views import APIView
from SignUp.models import Users
from SignUp.models import Customers
from SignUp.models import Merchants
from SignUp.models import Subscription
from Payments.x_pay_token import _get_x_pay_token
# from .serializers import UserSerializer
import requests
import json

#Sample request format
# {
#        "callId" : "7445029006194309402",
#        "disc" : "5",
#        "subtotal" : "95",
#        "total" : "95",
#        "first_time" : "false",
#        "orderId" : "54321"
# }
# disc is discount amount
# subtotal is product price - disc
# total is subtotal + tax
# we can also add tax field but, have not added here in Django
# orderId random 5 digits. Use rand(). Can use same id as invoice id in invoice model

class makePayment(APIView):
    @staticmethod
    def post(request):
        callId = request.data["callId"]
        disc = request.data["disc"]
        st = request.data["subtotal"]
        tot = request.data["total"]
        flag = request.data["first_time"]
        ord = request.data["orderId"]
        #callId = 7445029006194309402
        url = "https://sandbox.api.visa.com/wallet-services-web/payment/info/"+str(callId)
        
        querystring = {"apikey":"YJB2TDNKKHKV7UJTUSA021-Yz3ZeIEIJUw2Qq0fnqyT8mL3BA"}
        body = {
                "orderInfo": {
                "currencyCode": "INR",
                "discount": disc,
                "eventType": "Confirm" if (flag=="true") else "Confirm_COF",
                "orderId": ord,
                "subtotal": st,
                "total": tot
                }
            }
        body = json.dumps(body)
        headers = {
                   'x-pay-token':  _get_x_pay_token(callId, body),
		   'Accept': 'application/json',
		   'Content-Type': 'application/json'
                  }
        
        response = requests.request("PUT", url, headers=headers, params=querystring, data=body)
        if response.status_code == 200 :
       	    return Response({"payment":"success"})
        return Response({"payment":"failure"})     
