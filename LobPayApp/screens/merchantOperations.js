import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,Button ,TouchableOpacity, Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class MerchantOperations extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          mid: props.mid,
        };
    }
    render() {
        return (
        // <View style={styles.container}>
        //   <View style={styles.buttonContainer}>
        //   <Button
        //     title={'Manage Inventory'}
        //     onPress={() => Actions.manageInventory({mid:this.state.mid})}
        //   />
        //   </View>
        //   <View style={styles.buttonContainer}>
        //   <Button
        //     title={'Make Bill'}
        //     onPress={() => Actions.makeBill({mid:this.state.mid})}
        //   />
        //   </View>
        //   <View style={styles.buttonContainer}>
        //   <Button
        //     title={'Search Customer'}
        //     onPress={() => Actions.searchCustomers({mid:this.state.mid})}
        //   />
        //   </View>
        //   <View style={styles.buttonContainer}>
        //   <Button
        //     title={'Make Payment'}
        //     onPress={() => Actions.payMerchant({mid:this.state.mid})}
        //   />
        //   </View>
        // </View>
        <View style={styles.container}>
          <TouchableOpacity  onPress={() => Actions.manageInventory({mid:this.state.mid})} style={styles.loginBtn}>
          <Text style={styles.loginText}>Manage Inventory</Text>
        </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.makeBill({mid:this.state.mid})} style={styles.loginBtn}>
          <Text style={styles.loginText}>Make Bill</Text>
        </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.searchCustomers({mid:this.state.mid})} style={styles.loginBtn}>
          <Text style={styles.loginText}>Search Customer</Text>
        </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.payMerchant({mid:this.state.mid})} style={styles.loginBtn}>
          <Text style={styles.loginText}>Make Payment</Text>
        </TouchableOpacity>
        </View>
        
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    justifyContent: 'space-between',
    padding: 15,
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