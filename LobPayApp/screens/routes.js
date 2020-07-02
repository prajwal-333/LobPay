import React, { Component } from 'react';
import {Router, Stack,Scene} from 'react-native-router-flux';
import { Alert, Button, TextInput, View, StyleSheet,Text,TouchableOpacity } from 'react-native';
import Login from './Login';
import Signup from './Signup';
import Otp from './Otp';
import SignupCustomer from './signupCustomer';
import SignupMerchant from './signupMerchant';
import Choose from './Choose';
import Customer from './Customer';
import MerchantOperations from './merchantOperations';
import ManageInventory from './manageInventory';
import AddProduct from './addProduct';
import MakeBill from './makeBill';
import ShowCart from './showCart';
import SearchCustomers from './searchCustomers';
import PayMerchant from './payMerchant';
// import Signup from './Signup';
// import Otp from './Otp';


export default class Routes extends Component {
    render() {
        return (
            <Router barButtonIconStyle ={styles.barButtonIconStyle}
                hideNavBar={false} 
                navigationBarStyle={{backgroundColor: '#002299',}} 
                titleStyle={{color: 'white',}}
            >
                <Stack key="root">
                <Scene key="login" component={Login} title="Login"/>
                {/* <Scene key="signup" component={Signup} title="Signup"/> */}
                <Scene key="choose" component={Choose} title="Choose"/>
                <Scene key="signupCustomer" component={SignupCustomer} title="Signup"/>
                <Scene key="signupMerchant" component={SignupMerchant} title="Signup"/>
                <Scene key="otp" component={Otp} title="Otp"/>
                <Scene key="customer" component={Customer} title="Customer"/>
                <Scene key="merchantOperations" component={MerchantOperations} title="Merchant Operations" renderBackButton={()=><View/>}/>
                <Scene key="manageInventory" component={ManageInventory} title="Manage Inventory"/>
                <Scene key="addProduct" component={AddProduct} title="Add Product"/>
                <Scene key="makeBill" component={MakeBill} title="Make Bill"/>
                <Scene key="showCart" component={ShowCart} title="Cart"/>
                <Scene key="searchCustomers" component={SearchCustomers} title="Search Customers"/>
                <Scene key="payMerchant" component={PayMerchant} title="Pay Merchant"/>
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