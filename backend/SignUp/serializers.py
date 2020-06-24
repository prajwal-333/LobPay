from rest_framework import serializers
# from .models import Users
# from .models import Customers
# from .models import Merchants


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model  = Users
#         model2  = Customers
#         model3  = Merchants
#         fields = ('username','password','mobile_number')

#     def create(self, validated_data):
#         username = validated_data.get("username")
#         password = validated_data.get("password")
#         mobile = validated_data.get("mobile")
#         # merchant = validated_data.get("merchant")
#         print(username, password, mobile)
#         new_user = Users.object.create(username=username, password=password, mobile_number=mobile)
#         # if merchant==1:
#         return new_user


        
        
