import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,Button ,TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          username: '',
          firstname: '',
          lastname: '',
          password: '',
          password2:'',
          email:'',
        };}
    onSignUp() {
        const { username,firstname,lastname,phone,password,password2 } = this.state;
        const user = {
          username: `${username}`,
          firstname:`${firstname}`,
          lastname:`${lastname}`,
          phone:`${phone}`,
          password: `${password}`,
          password_con: `${password2}`,
        };
        // fetch('http://172.27.30.182:8000/api/register',{
        //     method: 'POST',
        //     // api/register
        //      headers: new Headers({
        //          'Content-Type': 'application/json' // <-- Specifying the Content-Type
        //     }),
        //     body: JSON.stringify(user),
        //   })
        //   .then((response) => response.json())
        //   .then((responseJson) => {
        //     console.log(responseJson);
        //    if(responseJson.message=='Sent the OTP'){
        //        Actions.otp();
        //    }else {
        //        Alert.alert('User Already Registered');
        //        this.goBack;
        //    }
        //   if(responseJson.phone==`${phone}`){
        //    // Actions.login();
        //   }else{
        //     Alert.alert(responseJson.msg);
        //   }
        Actions.otp();
    }
    goBack() {
        Actions.pop();
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
          secureTextEntry={true}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        <TextInput
          value={this.state.password2}
          onChangeText={(password2) => {
            return this.setState({ password2 });
          }}
          placeholder={'ReType-Password'}
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
module.exports = Signup;