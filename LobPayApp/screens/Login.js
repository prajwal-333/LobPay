import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,Button ,TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Signup from './Signup';
// export default function login() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up login.js to start working on your app!</Text>
//       </View>
//     );
//   }
const logUser='http://192.168.18.4:8000/verify/signin/'
async function LoginUser(params) {
  console.log(params);
  try {
      let response = await fetch(logUser, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: params
      });
      let responseJson = await response.json();
      // console.log(responseJson["exist"]);
      // if(responseJson["exist"]==="true")return "exists";
      // else return "sent";
      // return responseJson.result; 
      return responseJson;
  } catch (error) {
      console.error(`Error is : ${error}`);
  }
}
export default class Login extends Component{
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:''
    };
  }

  onLogin(){
    const {username,password} =this.state;
    const user = {
      username:`${username}`,
      password:`${password}`
    }
    let x=JSON.stringify(user);
        // console.log(x);
        LoginUser(x).then((result)=>{
          console.log(result);
          if(result["verified"]==="false"){
           // console.log("yes");
            Alert.alert(
              'Alert Title',
              'Wrong UsernAme Or password', // <- this part is optional, you can pass an empty string
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            );
          }else if(result["verified"]==="true"){
            if(result["is_merchant"]===false)Actions.customer({text:result["id"]});
            else {
                Actions.merchantOperations({mid:result["id"]});
            }
          }
        });
  }

  choose() {
    Actions.choose();
}
  searchCustomers() {
    Actions.searchCustomers();
  }
  payMerchant() {
    Actions.payMerchant();
  }
  render(){
    return(
      <View style={styles.container}>
        <TextInput
          value={this.state.phone}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'username'}
          style={styles.input}
          // keyboardType='number-pad'
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
         <Button
          title={'Login'}
          style={styles.input}
          onPress={this.onLogin.bind(this)}
        />
        <View style={styles.signupTextCont}> 
                    <Text >Already have an account? </Text>
                    <TouchableOpacity onPress={this.choose}><Text style={styles.signupButton}>Sign up</Text></TouchableOpacity>
                   {/*Added for Testing components */}
                    {/* <TouchableOpacity onPress={this.searchCustomers}><Text style={styles.signupButton}> SearchCustomer</Text></TouchableOpacity>
                    <TouchableOpacity onPress={this.payMerchant}><Text style={styles.signupButton}> PayMerch</Text></TouchableOpacity> */}
        </View>
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
module.exports = Login;