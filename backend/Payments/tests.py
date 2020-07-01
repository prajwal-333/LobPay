from calendar import timegm  
from datetime import datetime  
from hashlib import sha256  
import hmac  
shared_secret = 'B123456789B123456789B123456789B123456789'
pre_hash_string ='1544444444payment/data/1234567890123456789apikey=A123456789A123456789A123456789A123456789A12345678&encryptionKey=E123456789E123456789E123456789E123456789E12345678' 
hash_string = hmac.new(shared_secret.encode('utf-8'),  
			msg=pre_hash_string.encode('utf-8'),  
			digestmod=sha256).hexdigest();
print( 'xv2:' + '1544444444' + ':' + hash_string)
