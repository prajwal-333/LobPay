import React,{Component} from 'react';
import { StyleSheet, View,TextInput,Text,Button,Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
const apiHost ='http://192.168.43.122:8000';// Update with ip of host in the network

export default class PayMerchant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.customer ? props.customer.username : '',
            amount: props.bill ? props.bill.tAmount : '',
            bill: props.bill ? props.bill : undefined,
        };
    }
    goBack() {
        Actions.pop();
    }
    makePayment() {
      console.log(this.state);
      // fetch(apiHost + '/pay', {method: 'POST', body: this.state})
      //   .then((response) => response.json())
      //   .then((responseJson) => {
      //     console.log(responseJson);
      //   })
      //   .catch((e) => {
      //     console.log(e.message);
      //     Alert.alert(e.message);
      //   });
    }
    render() {
        return(
        <View style={styles.container}>
          <View style={styles.inputContainer}>
          <TextInput
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
            placeholder={'Customer Mobile or Username'}
            keyboardType='default'
            style={styles.input}
          />
          </View>
          <View style={styles.inputContainer}>
          <TextInput
            value={this.state.amount}
            textContentType='creditCardNumber'
            onChangeText={(amount) => this.setState({ amount })}
            placeholder={'Bill Amount'}
            keyboardType='number-pad'
            style={styles.input}
          />
          </View>
          <View style={{padding: 10}}>
          <Button
            title={'Make Payment'}
            onPress={this.makePayment.bind(this)}
          />
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
});