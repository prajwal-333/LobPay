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
            <View style={styles.container}>
              {/* <View style={styles.buttonContainer}> */}
            {/* <Button title='Customer' onPress={this.customer}/> */}
            
            <TouchableOpacity onPress={this.customer} style={styles.loginBtn}>
          <Text style={styles.loginText}>Customer</Text>
        </TouchableOpacity>
{/* 
             <View style={styles.buttonContainer}>
            <Button title='Merchant' onPress={this.merchant}/>
            </View> */}
            <TouchableOpacity onPress={this.merchant} style={styles.loginBtn}>
          <Text style={styles.loginText}>Merchant</Text>
        </TouchableOpacity>
        </View>
    );
}
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    buttonContainer: {
        margin:5
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