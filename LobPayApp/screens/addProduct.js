import React,{Component} from 'react';
import { StyleSheet, View,TextInput,Text,Button,ScrollView,TouchableOpacity,Image,Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
const apiHost ='http://192.168.18.4:8000';// Update with ip of host in the network

export default class AddProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: props.edit !== undefined ? props.edit : null,
            description: props.edit !== undefined ? props.products[props.edit].description : '',
            weight: props.edit !== undefined ? String(props.products[props.edit].weight) : '',
            price: props.edit !== undefined ? String(props.products[props.edit].price) : '',
            units: props.edit !== undefined ? String(props.products[props.edit].units) : '',
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
        description : this.state.description,
        weight : Number(this.state.weight),
        price : Number(this.state.price),
        units : Number(this.state.units),
      }

      var Products = this.state.products;
      if(this.state.edit !== null)   Products[this.state.edit] = product;
      else                           Products.push(product);
      Actions.pop();
      setTimeout(() => {
        Actions.refresh({products: Products});
      },0);
    }
    render() {
        return(
        <View style={styles.container}>
          <TextInput
            value={this.state.description}
            onChangeText={(description) => this.setState({description})}
            placeholder={'Product Name'}
            keyboardType='default'
            style={styles.input}
          />
          <TextInput
            value={this.state.weight}
            onChangeText={(weight) => this.setState({weight})}
            placeholder={'Weight in Kg'}
            keyboardType='number-pad'
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
            value={this.state.units}
            onChangeText={(units) => this.setState({units})}
            placeholder={'Number of Units'}
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