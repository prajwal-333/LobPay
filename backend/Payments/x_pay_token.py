from calendar import timegm  
from datetime import datetime  
from hashlib import sha256  
import hmac  

def _get_x_pay_token(callId, body):  
    timestamp = str(timegm(datetime.utcnow().timetuple()))  
    resource_path = "payment/info/"+str(callId)
    query_string = "apikey=YJB2TDNKKHKV7UJTUSA021-Yz3ZeIEIJUw2Qq0fnqyT8mL3BA"
    shared_secret = "nedTrsWQYJQ0#1OL$Mz@QPfyVkUGq3Estv4d+W-L"
    pre_hash_string = timestamp + resource_path + query_string + str(body)  
    hash_string = hmac.new(shared_secret.encode('utf-8'),  
                           msg=pre_hash_string.encode('utf-8'),  
                           digestmod=sha256).hexdigest();
    return 'xv2:' + timestamp + ':' + hash_string
