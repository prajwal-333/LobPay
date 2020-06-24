from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Users
from .models import Customers
from .models import Merchants
from .models import Subscription
# from .serializers import UserSerializer
import requests
import json

class getPhoneNumberRegistered(APIView):
# Get to Create a call for OTP
    @staticmethod
    def get(request, phone):
        global msg, response
        msg = "false"
        try:
            Mobile = Users.objects.get(mobile_number=phone)  # if Mobile already exist alert
            # print(Mobile)
            # print(getattr(Mobile, "id"))
            # for u in Mobile:
                # print(u)
            return Response({"exist":"true"} , status=409)
        except ObjectDoesNotExist:
            # Using Multi-Threading send the OTP Using Messaging Services like Twilio or Fast2sms
            url = "https://gurubrahma-smsly-sms-to-india-v1.p.rapidapi.com/otp/generate/"+str(phone)

            querystring = {"getOTP":"true","duration":"100","digits":"5","message":"Your LobPay verification code is OTP_VALUE"}

            headers = {
                'x-rapidapi-host': "gurubrahma-smsly-sms-to-india-v1.p.rapidapi.com",
                'x-rapidapi-key': "a8e07551f2msh8f97f4821a0a0c5p1afdbbjsn23fb1d0d27ed"
            }

            response = requests.request("GET", url, headers=headers, params=querystring)
            if ('errorCode' in response.json()) and response.json()['errorCode']==0:
                msg = "true"
            else:
                msg = "false"
        return Response({"success":msg} , status=200)

    # This Method verifies the OTP
    @staticmethod
    def post(request, phone):
        global response
        OTP = response.json()["OTP"]

        if ('otp' in request.data) and (OTP == request.data["otp"]):  # Verifying the OTP
            # new_data = request.data
            # new_data["mobile"] = int(phone)
            # serializer = UserSerializer(data=new_data)
            # if serializer.is_valid():
            #     serializer.save()
            username = request.data["username"]
            password = request.data["password"]
            new_user = Users.objects.create(username=username, password=password, mobile_number=int(phone))
            Mobile = Users.objects.get(mobile_number=phone)
            id = int(getattr(Mobile, "id"))
            merchant = request.data["merchant"]
            if merchant==1:
                address = request.data["address"]
                account_info = request.data["account_info"]
                new_merchant = Merchants.objects.create(id=Mobile,address=address, account_info=account_info)
            else:
                new_customer = Customers.objects.create(id=Mobile)
            return Response({"verified":"true"}, status=200)
        return Response({"verified":"false"}, status=400)



class signIn(APIView):
    # This Method verifies the Signin Information
    @staticmethod
    def post(request):
        username = request.data["username"]
        password = request.data["password"]
        try:
            user = Users.objects.get(username=username)
            act_pass = getattr(user, "password")
            print(act_pass, password)
            if act_pass == password:
                return Response({"verified":"true"}, status=200)
            return Response({"verified":"false"}, status=400)
        except ObjectDoesNotExist:
            return Response({"verified":"false","issue":"User does not exist"}, status=400)
