import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,Button ,TouchableOpacity, Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class MerchantOperations extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
        };
    }
    render() {
        return (
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
          <Button
            title={'Manage Inventory'}
            onPress={() => Actions.manageInventory()}
          />
          </View>
          <View style={styles.buttonContainer}>
          <Button
            title={'Make Bill'}
            onPress={() => Actions.makeBill()}
          />
          </View>
          <View style={styles.buttonContainer}>
          <Button
            title={'Search Customer'}
            onPress={() => Actions.searchCustomers()}
          />
          </View>
          <View style={styles.buttonContainer}>
          <Button
            title={'Make Payment'}
            onPress={() => Actions.payMerchant()}
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
    justifyContent: 'center',
  },
  buttonContainer: {
    justifyContent: 'space-between',
    padding: 15,
  },
});