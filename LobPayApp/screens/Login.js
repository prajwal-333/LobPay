import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,Button ,TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Signup from './Signup';
// import { ThemeProvider } from 'react-native-elements';
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
        <View style={styles.inputView} >
        <TextInput
          value={this.state.phone}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'username'}
          style={styles.inputText}
          // keyboardType='number-pad'
        />
        </View>
        <View style={styles.inputView} >
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.inputText}
        />
        </View >
        <TouchableOpacity onPress={this.onLogin.bind(this)} style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
         {/* <Button
          title={'Login'}
          style={styles.loginBtn}
          onPress={this.onLogin.bind(this)}
        /> */}
        <View style={styles.signupTextCont}> 
                    <Text >Already have an account? </Text>
                    <TouchableOpacity onPress={this.choose}><Text style={styles.signupButton}>Sign up</Text></TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
   logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
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
    backgroundColor:"#fbc41b",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});
module.exports = Login;