import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,Button ,TouchableOpacity,Alert} from 'react-native';
import {Actions,Link} from 'react-native-router-flux';
const InsertMerc='http://192.168.18.4:8000/verify/signup/';//'https://webhook.site/f07ff216-6914-4a8c-b4ac-32df20afc2db';//'http://127.0.0.1:8000/verify/signup/';

async function insertMerchant(params) {
  console.log(params);
  try {
      let response = await fetch(InsertMerc, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: params
      });
      let responseJson = await response.json();
      console.log(responseJson);
      console.log(responseJson["exist"]);
      if(responseJson["exist"]==="true")return "exists";
      else return "sent";
      // return responseJson.result; 
  } catch (error) {
      console.error(`Error is : ${error}`);
  }
}

export default class SignupCustomer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          username: '',
          phone:'',
          password: '',
         
        };}
    
    onSignUp() {
        // console.log("hi");
        const { username,phone,password } = this.state;
        const user = {
          mobile:`${phone}`,
          username: `${username}`,
          password: `${password}`,
          merchant: 0 ,
          is_otp: 'false'
        };
        let x=JSON.stringify(user);
        // console.log(x);
        insertMerchant(x).then((result)=>{
          console.log(result);
          if(result==="exists"){
           // console.log("yes");
            Alert.alert(
              'Alert Title',
              'User Exists', // <- this part is optional, you can pass an empty string
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            );
          }else if(result=="sent"){
            Actions.otp({text:phone});
          }
        });
    }
    goBack() {
        Actions.login();
        }
    render(){
        return(
        <View style={styles.container}>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          value={this.state.phone}
          onChangeText={(phone) => this.setState({ phone })}
          placeholder={'phone'}
          keyboardType='number-pad'
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        <Button
          title={'Signup'}
          style={styles.input}
          onPress={this.onSignUp.bind(this)}
        />
        { <View style={styles.signupTextCont}> 
                    <Text >Already have an account? </Text>
                    <TouchableOpacity onPress={this.goBack}><Text style={styles.signupButton}>Login</Text></TouchableOpacity>
            </View>        }
        </View>
        );
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 350,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  signupTextCont: {
    flexGrow: 0,
    justifyContent: 'center',
    //alignItems: 'flex-end',
    paddingVertical: 16,
    flexDirection: 'row'
  },
  signupText: {
    color: '#12799f', 
    fontSize:16
  },
  signupButton: {
      color: '#12799f',
      fontSize:16,
      fontWeight: '500'
  }
});
module.exports = SignupCustomer;