import React,{Component} from 'react';
import { StyleSheet, View,TextInput,Text,Button,Alert,TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
const apiHost ='http://192.168.43.122:8000';// Update with ip of host in the network

export default class PayMerchant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mid: props.mid,
            mobile: props.customer ? String(props.customer.mobile) : '',
            amount: props.bill ? String(props.bill.tAmount) : '',
            bill: props.bill ? props.bill : undefined,
        };
    }
    goBack() {
        Actions.pop();
    }
    makePayment() {
      if(this.state.bill === undefined) {
        this.state.bill = {};
        this.state.bill.bAmount = this.state.amount;
        this.state.bill.tAmount = this.state.amount;
        this.state.bill.discount = "";
      }
      console.log(this.state);
      Actions.paymentAuth(this.state);
    }
    render() {
        return(
        <View style={styles.container}>
          <View style={styles.inputView}>
          <TextInput
            value={this.state.mobile}
            onChangeText={(mobile) => this.setState({ mobile })}
            placeholder={'Customer Mobile Number'}
            keyboardType='default'
            style={styles.inputText}
          />
          </View>
          <View style={styles.inputView}>
          <TextInput
            value={this.state.amount}
            textContentType='creditCardNumber'
            onChangeText={(amount) => this.setState({ amount })}
            placeholder={'Bill Amount'}
            keyboardType='number-pad'
            style={styles.inputText}
          />
          </View>
          <TouchableOpacity onPress={this.makePayment.bind(this)} style={styles.loginBtn}>
          <Text style={styles.loginText}>Make Payment</Text>
        </TouchableOpacity>
          {/* <Button
            title={'Make Payment'}
            onPress={this.makePayment.bind(this)}
          /> */}
          { <View style={styles.signupTextCont}> 
                    <Text >New Here? </Text>
                    <TouchableOpacity onPress={this.Web}><Text style={styles.signupButton}>Reister</Text></TouchableOpacity>
            </View>        }
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
  inputContainer: {
    height: 80,
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  inputView:{
    width:"80%",
    backgroundColor:"#002299",
    borderRadius:25,
    height:80,
    marginBottom:20,
    justifyContent:"center",
    padding:10
  },
  inputText:{
    height:70,
    color:"white",
    fontSize: 18,
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
    color:"white",
    fontSize: 18,
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
