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
    def post(request):
        # global msg, response
        # msg = "false"
        if request.data["is_otp"]=="false":
            try:
                mobile_number = request.data["mobile"]
                Mobile = Users.objects.get(mobile_number=mobile_number)  # if Mobile already exist alert
                return Response({"exist":"true"} , status=409)
            except ObjectDoesNotExist:
                username = request.data["username"]
                password = request.data["password"]
                mobile_number = request.data["mobile"]
                merchant = request.data["merchant"]
                # Using Multi-Threading send the OTP Using Messaging Services like Twilio or Fast2sms
                # url = "https://gurubrahma-smsly-sms-to-india-v1.p.rapidapi.com/otp/generate/"+str(mobile_number)

                # querystring = {"getOTP":"true","duration":"100","digits":"5","message":"Your LobPay verification code is OTP_VALUE"}

                # headers = {
                #     "x-rapidapi-host": "gurubrahma-smsly-sms-to-india-v1.p.rapidapi.com",
	            #     "x-rapidapi-key": "8b4036ce97mshf5634fcbf7ef9a4p19dd28jsne9faea7cd412",
                # }
            
                # response = requests.request("GET", url, headers=headers, params=querystring)
                # print(response.json())
                # if ('errorCode' in response.json()) and response.json()['errorCode']==0:
                #     msg = "true"
                # else:
                #     msg = "false"
                msg = "true"
                otp="4395"
                new_user = Users.objects.create(username=username, password=password, mobile_number=int(mobile_number),otp= otp, is_verified=False, is_merchant=merchant)
                # new_user = Users.objects.create(username=username, password=password, mobile_number=int(mobile_number),otp= response.json()["OTP"], is_verified=False, is_merchant=merchant)
                Mobile = Users.objects.get(mobile_number=mobile_number)
                id = int(getattr(Mobile, "id"))
                if merchant == 1:
                    address = request.data["address"]
                    account_info = request.data["account_info"]
                    pincode = request.data["pincode"]
                    lat = request.data["lat"]
                    long = request.data["long"]
                    print("asdasdasd",lat,long)
                    new_merchant = Merchants.objects.create(id=Mobile,address=address, account_info=account_info,pin=pincode, lat=lat, long=long, subscribers=0)
                else:
                    # print("here I am")
                    pincode = request.data["pincode"]
                    if 'checkout_id' in request.data: 
                        checkout_id = request.data["checkout_id"]
                    else:
                        checkout_id = ""
                    new_customer = Customers.objects.create(id=Mobile, pin=pincode, checkout_id=checkout_id)
                    
            return Response({"success":msg} , status=200)
        else:
            mobile_number = request.data["mobile"]
            otp = request.data["otp"]
            try:
                Mobile = Users.objects.get(mobile_number=mobile_number)
                otp_orig = getattr(Mobile, "otp")
                # print(otp_orig, otp)
                if otp_orig==otp:
                    # print("hiih")
                    Mobile.is_verified = True
                    Mobile.save()
                else:
                    Mobile.delete()
                    return Response({"verified":"False","problem":"wrong otp"} , status=409)
                return Response({"verified":"true"} , status=200)
            except:
                return Response({"success":"false","problem":"Wrong Mobile Number"},status=400)


class signIn(APIView):
    # This Method verifies the Signin Information
    @staticmethod
    def post(request):
        username = request.data["username"]
        password = request.data["password"]
        try:
            user = Users.objects.get(username=username)
            act_pass = getattr(user, "password")
            verify = getattr(user, "is_verified")
            is_merchant = getattr(user, "is_merchant")
            # print(act_pass, password)
            if verify==False:
                user.delete()
                return Response({"verified":"false","issue":"User does not exist"}, status=400)
            if (act_pass == password) and verify:
                return Response({"verified":"true", "is_merchant":is_merchant, "id":user.id}, status=200)
            return Response({"verified":"false"}, status=400)
        except ObjectDoesNotExist:
            return Response({"verified":"false","issue":"User does not exist"}, status=400)
