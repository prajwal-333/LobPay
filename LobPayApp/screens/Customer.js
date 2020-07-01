import React, { Component,useState,useEffect } from "react";
import { FlatList, StyleSheet, Text, View, InteractionManager,Item,TouchableHighlight, Button,TouchableOpacity } from "react-native";

// import {Location,Permissions}from 'expo';
import * as Location from 'expo-location';

const mercList='http://192.168.18.4:8000/subscribe/merchantlist/';
const subsList='http://192.168.18.4:8000/subscribe/subscription/';
// let xData=[];
// let y=[];
let cusid=2;
function compare( a, b ) {
  if ( a.distance < b.distance ){
    return -1;
  }
  if ( a.distance > b.distance ){
    return 1;
  }
  return 0;
}

function Subscribe(item){
  console.log(item);
  console.log("Subscribed to ");
  
    let subsAdress=subsList+cusid+'/'+item["id"];
    fetch(subsAdress, {
      method: 'GET'
      //Request Type 
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
      //Success 
      console.log("here");
      console.log(responseJson["Subscribed"]);
      return responseJson;
    })
    //If response is not in json then in error
    .catch((error) => {
      //Error 
      console.error(error);
    });
}
function UnSubscribe(item){
    console.log(item);
    console.log("Subscribed to ");
    
      let subsAdress=subsList+cusid+'/'+item["id"];
      fetch(subsAdress, {
        method: 'DELETE'
        //Request Type 
      })
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
        //Success 
        console.log("here");
        console.log(responseJson["Subscribed"]);
        return responseJson;
      })
      //If response is not in json then in error
      .catch((error) => {
        //Error 
        console.error(error);
      });
}
export default class Customer extends Component {  
  constructor(props){
    super(props);
    this.state={
      dataSource: [],
      refresh: false,
      latitude:0,
      longitude:0,
      CustId:this.props.text
    }
  };

  _getLocation=async()=>{
    cusid=this.state.CustId;
    const {status} = await Location.requestPermissionsAsync();
    if(status!=='granted'){
      console.log('Permissiion Not Granted');
    }
    const userLocation = await Location.getCurrentPositionAsync({});
    console.log(userLocation["coords"]["latitude"].toFixed(6));
    this.setState({
      latitude:userLocation["coords"]["latitude"].toFixed(6),
      longitude:userLocation["coords"]["longitude"].toFixed(6)
    })
    // return this.state.latitude;
    this.pullData();
  }
    componentDidMount(){
    this._getLocation();
   }


  pullData(){
    const user={
      "cid":this.state.CustId,
      "lat":this.state.latitude,
      "long":this.state.longitude
  };
  let x=JSON.stringify(user);
  // console.log(x);
  fetch(mercList, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: x })
    .then((response)=>response.json())
    .then((responseJson)=>{
      console.log(responseJson);
      // this.dataSource=responseJson;
        console.log(responseJson);
        this.setState({
          dataSource: responseJson.sort( compare )
        })
        })
        // this.dataSource=responseJson;
    .catch((error)=>{
      console.log(error);
    });
   }

   handleClick = () => {
    console.log("Click");
    this.pullData();
    console.log(this.dataSource);
    this.setState({ 
      refresh: !this.state.refresh
  })
  };
  render() {  
    return (  
      <View style={styles.container}>
        <FlatList style={{flex: 1}}
      data={this.state.dataSource }
      extraData={this.state}
      renderItem={({item}) => (
        // <TouchableHighlight
        //   key={item["id"]}
        //   onPress={() => this._onPress(item)}>
          <View style={{borderWidth: 1,paddingHorizontal: 20, paddingVertical: 10,alignItems:'center'}}>
            <Text style={{fontSize:18,fontWeight: '600'}}>SHOPNAME:{item["address"]}</Text>
            <Text style={{fontSize:18,fontWeight: '600'}}>DISTANCE: {item["distance"]}</Text>
            <Text style={{fontSize:18,fontWeight: '600'}}>SUBSCRIBERS: {item["subscribers"]}</Text>
            {/* {item["subscribed"]==='false' &&
            <Button title={'Subscribe'} onPress={()=>{console.log(Subscribe(item));this.handleClick();
            this.handleClick();
            }}/>} */}
            {item["subscribed"]==='false' &&
             <TouchableOpacity onPress={()=>{console.log(Subscribe(item));this.handleClick();this.handleClick();this.handleClick();}} style={styles.loginBtn}>
            <Text style={styles.loginText}>Subscribe</Text>
            </TouchableOpacity>}
            {/* {item["subscribed"]==='true' && <Button title={'UnSubscribe'} onPress={()=>{UnSubscribe(item);this.handleClick();this.handleClick();this.handleClick();}}/>} */}
            {item["subscribed"]==='true' &&
             <TouchableOpacity onPress={()=>{UnSubscribe(item);this.handleClick();this.handleClick();this.handleClick();}} style={styles.loginBtn}>
            <Text style={styles.loginText}>UnSubscribe</Text>
            </TouchableOpacity>}
             </View>
        // </TouchableHighlight>
        )}
        keyExtractor={(item,index) => item+index}
        // ItemSeparatorComponent={(item)=>{
        //   return(
        //   <View style={{height:1,width:'100%',backgroundColor:'black'}}>
        //   </View>)
        // }}
        />
      </View>
    );  
  }  
}  


const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#F5FCFF"
  },
  button: {
    borderColor: "#000066",
    borderWidth: 1,
    borderRadius: 10
  },
  buttonPress: {
      borderColor: "#000066",
      backgroundColor: "#000066",
      borderWidth: 1,
      borderRadius: 10
  },
  inputView:{
    width:"80%",
    backgroundColor:"#002299",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#d90000",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"black"
  }
});
module.exports = Customer;