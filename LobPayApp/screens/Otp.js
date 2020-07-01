import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,Button,Alert } from 'react-native';
import signupMerchant from './signupMerchant';
import { Actions } from 'react-native-router-flux';

const OtpAdress='http://192.168.18.4:8000/verify/signup/';//'https://webhook.site/f07ff216-6914-4a8c-b4ac-32df20afc2db';//'http://127.0.0.1:8000/verify/signup/';

// let num=signupMerchant.phone;

async function sentOtp(params) {
    console.log(params);
    try {
        let response = await fetch(OtpAdress, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: params
        });
        let responseJson = await response.json();
        console.log(responseJson["verified"]);
        if(responseJson["verified"]==="true")return "yes";
        else return "no";
        // return responseJson.result; 
    } catch (error) {
        console.error(`Error is : ${error}`);
    }
  }
export default class Otp extends Component {
constructor(props){
    super(props);
    this.state={
     pin1 : "",
     pin2 : "",
     pin3 : "",
     pin4 : "",
     pin5 : "",
     phone:this.props.text
    }
}
componentDidMount=()=>{
    this.refs.pin1ref.focus();
}
onSent(){
    const { pin1,pin2,pin3,pin4,pin5,phone } = this.state;
    // console.log(pin1+pin2+pin3+pin4+"phone :"+phone);
    const pinFull=''.concat(pin1,pin2,pin3,pin4,pin5);

    const user={
        mobile: `${phone}`,
        otp: `${pinFull}`,
        is_otp: 'true'
    }
    let x=JSON.stringify(user);
        console.log(x);
    sentOtp(x).then((result)=>{
        console.log(result);
        if(result==="no"){
        // console.log("yes");
        Alert.alert(
            'Alert Title',
            'wrong Otp', // <- this part is optional, you can pass an empty string
            [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
            {text: 'SignupAgain?',onPress:()=> Actions.signupMerchant()},
            ],
            {cancelable: false},
        );
        }else if(result=="yes"){
       // Actions.otp({text:phone});
       Actions.login();
        }
    });
}
render(){
  return (
    // <View><style={styles.container}>
    <View style={styles.container}>
        <View style={{flex:0.6,justifyContent:'space-evenly',flexDirection:'row'}}>
        <TextInput
            ref={"pin1ref"}
            onChangeText={(pin1)=>{
            this.setState({pin1:pin1})
            if(pin1!=""){
                this.refs.pin2ref.focus();
            }
            }}
            value={this.state.pin1}
            maxLength={1}
            keyboardType='number-pad'
            style={{
            backgroundColor:`#f5f4f2`,
            fontWeight:"600",
            alignSelf:'center',
            padding:10,
            fontSize: 20,
            height: 55,
            width: '10%',
            borderRadius:10,
            borderWidth:0.5,
            borderColor: 'grey',
            alignContent:"center",
        }}

        />
        <TextInput
            ref={"pin2ref"}
            onChangeText={(pin2)=>{
                this.setState({pin2:pin2})
                if(pin2!=""){
                    this.refs.pin3ref.focus();
                }
                }}
            value={this.state.pin2}
            maxLength={1}
            keyboardType='number-pad'
            style={{backgroundColor:`#f5f4f2`,fontWeight:"600",alignSelf:'center',
            padding:10,
            fontSize: 20,
            height: 55,
            width: '10%',
            borderRadius:10,
            borderWidth:0.5,
            borderColor: 'grey',
            alignContent:"center",
        }}
        />
        <TextInput
            ref={"pin3ref"}
            onChangeText={(pin3)=>{
                this.setState({pin3:pin3})
                if(pin3!=""){
                    this.refs.pin4ref.focus();
                }
                }}
            keyboardType='number-pad'
            value={this.state.pin3}
            maxLength={1}
            style={{backgroundColor:`#f5f4f2`,
            fontWeight:"600",
            alignSelf:'center',
            padding:10,
            fontSize: 20,
            height: 55,
            width: '10%',
            borderRadius:10,
            borderWidth:0.5,
            borderColor: 'grey',
            alignContent:"center",
        }}
        />
        <TextInput
            ref={"pin4ref"}
            onChangeText={(pin4)=>{
                this.setState({pin4:pin4})
                if(pin4!=""){
                    this.refs.pin5ref.focus();
                    // alert('Pin Submitted');
                }
                }}
            value={this.state.pin4}
            maxLength={1}
            keyboardType='number-pad'
            style={{backgroundColor:`#f5f4f2`,fontWeight:"600",alignSelf:'center',
            padding:10,
            fontSize: 20,
            height: 55,
            width: '10%',
            borderRadius:10,
            borderWidth:0.5,
            borderColor: 'grey',
            alignContent:"center"
        }}
        />
        <TextInput
            ref={"pin5ref"}
            onChangeText={(pin5)=>{
                this.setState({pin5:pin5})
                // if(pin4!=""){
                //     //this.refs.pin2ref.focus();
                //     alert('Pin Submitted');
                // }
                }}
            value={this.state.pin5}
            maxLength={1}
            keyboardType='number-pad'
            style={{backgroundColor:`#f5f4f2`,fontWeight:"600",alignSelf:'center',
            padding:10,
            fontSize: 20,
            height: 55,
            width: '10%',
            borderRadius:10,
            borderWidth:0.5,
            borderColor: 'grey',
            alignContent:"center"
        }}
        />
        </View>
        <Button
          title={'Submit'}
        //   style={styles.input}
          onPress={this.onSent.bind(this)}
        />
    </View>
  );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

module.exports = Otp;
