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

export default class Login extends Component{
  constructor(props){
    super(props);
    this.state={
      phone:'',
      password:''
    };
  }
  signup() {
    Actions.signup();
}
  render(){
    return(
      <View style={styles.container}>
        <TextInput
          value={this.state.phone}
          onChangeText={(phone) => this.setState({ phone })}
          placeholder={'phone'}
          style={styles.input}
          keyboardType='number-pad'
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
          // onPress={this.onLogin.bind(this)}
        />
        <View style={styles.signupTextCont}> 
                    <Text >Already have an account? </Text>
                    <TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}>Sign up</Text></TouchableOpacity>
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
