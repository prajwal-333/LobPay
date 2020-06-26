import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,Button ,TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Choose extends Component{
    customer(){
        Actions.signupCustomer();
    }
    merchant(){
        console.log("Merchant");
        Actions.signupMerchant();
    }
    render(){
    return(
        <View style={{alignItems:'center',}}>
            <Button title='Customer' onPress={this.customer}/>
            <Button title='Merchant' onPress={this.merchant}/>
        </View>
    );
}
};