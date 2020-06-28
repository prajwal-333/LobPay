import React, { Component } from 'react';
import {Router, Stack,Scene} from 'react-native-router-flux';
import { Alert, Button, TextInput, View, StyleSheet,Text,TouchableOpacity } from 'react-native';
import Login from './Login';
import Signup from './Signup';
import Otp from './Otp';
import SignupCustomer from './signupCustomer';
import SignupMerchant from './signupMerchant';
import Choose from './Choose';
<<<<<<< HEAD
import Customer from './Customer';
=======
import SearchCustomers from './searchCustomers';
import PayMerchant from './payMerchant';
>>>>>>> 455125e8c73cc842dc356e138f074e9fe7a12f6f
// import Signup from './Signup';
// import Otp from './Otp';


export default class Routes extends Component {
    render() {
        return (
            <Router barButtonIconStyle ={styles.barButtonIconStyle}
                hideNavBar={false} 
                navigationBarStyle={{backgroundColor: '#1565c0',}} 
                titleStyle={{color: 'white',}}
            >
                <Stack key="root">
                <Scene key="login" component={Login} title="Login"/>
                {/* <Scene key="signup" component={Signup} title="Signup"/> */}
                <Scene key="choose" component={Choose} title="Choose"/>
                <Scene key="signupCustomer" component={SignupCustomer} title="Signup"/>
                <Scene key="signupMerchant" component={SignupMerchant} title="Signup"/>
                <Scene key="otp" component={Otp} title="Otp"/>
<<<<<<< HEAD
                <Scene key="customer" component={Customer} title="Customer"/>
=======
                <Scene key="searchCustomers" component={SearchCustomers} title="Search Customers"/>
                <Scene key="payMerchant" component={PayMerchant} title="Pay Merchant"/>
>>>>>>> 455125e8c73cc842dc356e138f074e9fe7a12f6f
                </Stack>
            </Router>
        )
    }
}

const styles =StyleSheet.create( {
    barButtonIconStyle: {
        tintColor: 'white'
    }
});

module.exports = Routes;