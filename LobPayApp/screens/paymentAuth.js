import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,Alert ,TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';

const apiHost='http://192.168.43.122:8000';

export default class PaymentAuth extends Component{
  constructor(props){
    super(props);
    this.state={
      mid: props.mid,
      mobile: String(props.mobile),
      password: '',
      bill: props.bill,
      amount: props.amount,
    };
    console.log(this.state);
  }
  onConfirm(){
    const {mid,mobile,password} =this.state;
    const user = {
      mobile:`${mobile}`,
      password:`${password}`
    }
    let x=JSON.stringify(user);
    fetch(apiHost + '/payment/auth/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: x
    })
    .then((response) => response.json())
    .then((result) => {
        console.log(result);
        if (result && result["verified"]==="true") {
            console.log('Visa Checkout');
            // Add Payment Gateway Route

            // Add below line to Succeful Payment part
            Actions.push('merchantOperations', {mid: this.state.mid});
        }
        else {
            Alert.alert(
            'Invalid Credentials',
            '',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
            );
        }
    })
    .catch((e) => {
        console.log(e.message);
        Alert.alert(
            'Error',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );
    });
  }
  getMobile() {
    var mobile = this.state.mobile.slice(0,2) + 'XXXXX' + this.state.mobile.slice(7,10);
    return mobile;
  }
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.inputView} >
        <TextInput
          value={this.getMobile()}
          placeholder={'Mobile'}
          style={styles.inputText}
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
        </View>
        <View>
        <TouchableOpacity onPress={this.onConfirm.bind(this)} style={styles.Btn}>
          <Text style={styles.Text}>Confirm</Text>
        </TouchableOpacity>
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
  Btn:{
    width: 150,
    backgroundColor:"#fbc41b",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  Text:{
    color:"white"
  }
});