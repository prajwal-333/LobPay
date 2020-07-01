
class merchantList(APIView):
    @staticmethod
    def post(request):
        KEY = 'BqbsKmGUTe303suAN3GAqZTV4LgSlVLz'
        cid = request.data["cid"]
        lat = request.data["lat"]
        long = request.data["long"]
        fro = str(lat)+'%2C+'+str(long)
        print(fro)
        merch_set= Merchants.objects.values()
        merch_data = list(merch_set.values('id','address','pincode'))
        for i,j in zip(merch_set,merch_data):
            print(i,j)
            subs = Subscription.objects.filter(cid=cid,mid=i['id_id'])
          
            to = str(i['lat'])+'%2C+'+str(i['long'])
            print(to)
            url = "https://www.mapquestapi.com/directions/v2/route?key="+KEY+"&from="+fro+"&to="+to+"&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false&unit=k"
            response = requests.request("GET", url)
            print(response.json())
            dist = response.json()["route"]["distance"]
            j.update({"distance": dist})
            if subs:
                j.update({"subscribed": "true"})
            else:
                j.update({"subscribed": "false"})
        return JsonResponse(merch_data, safe=False)
