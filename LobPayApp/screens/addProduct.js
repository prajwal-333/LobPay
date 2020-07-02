import React,{Component} from 'react';
import { StyleSheet, View,TextInput,Text,Button,ScrollView,TouchableOpacity,Image,Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
const apiHost ='http://192.168.43.122:8000';// Update with ip of host in the network

export default class AddProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mid: props.mid,
            edit: props.edit !== undefined ? props.edit : null,
            name: props.edit !== undefined ? props.products[props.edit].name : '',
            price: props.edit !== undefined ? String(props.products[props.edit].price) : '',
            quantity: props.edit !== undefined ? String(props.products[props.edit].quantity) : '',
            products: props.products !== undefined ?  props.products : [],
        };
        console.log(this.state);
    }
    goBack() {
      Actions.pop();
    }
    onCancel() {
      this.goBack();
    }
    onConfirm() {
      var product = {
        name : this.state.name,
        price : Number(this.state.price),
        quantity : Number(this.state.quantity),
      }
      
      fetch(apiHost + '/inv/merchantInventory/' + this.state.mid, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify([product])
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.Success === "true") {
            var Products = this.state.products;
            if(this.state.edit !== null)   Products[this.state.edit] = product;
            else                           Products.push(product);
            console.log(Products);
            Actions.pop();
            setTimeout(() => {
              Actions.refresh({data: Products, products: Products});
            },100);
          }
          else {
            Alert.alert('Error Ocurred!');
          }
        })
        .catch((e) => {
          console.log(e.message);
          Alert.alert(e.message);
        });
    }
    render() {
        return(
        <View style={styles.container}>
          <TextInput
            value={this.state.name}
            onChangeText={(name) => this.setState({name})}
            placeholder={'Product Name'}
            keyboardType='default'
            style={styles.input}
          />
          <TextInput
            value={this.state.price}
            onChangeText={(price) => this.setState({price})}
            placeholder={'Price per unit'}
            keyboardType='number-pad'
            style={styles.input}
          />
          <TextInput
            value={this.state.quantity}
            onChangeText={(quantity) => this.setState({quantity})}
            placeholder={'Quantity'}
            keyboardType='number-pad'
            style={styles.input}
          />
          <View style={styles.buttonsContainer}>
            <View style={{flex: 0.5, padding: 5}}>
              <Button
                title={'Cancel'}
                color='#fbc41b'
                onPress={() => this.onCancel()}
              />
            </View>
            <View style={{flex: 0.5, padding: 5}}>
              <Button
                title={'Confirm'}
                color='#fbc41b'
                onPress={() => this.onConfirm()}
              />
            </View>
          </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    padding: 10,
  },
  input: {
    width: '100%',
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    fontSize: 15,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: -5,
  },
});