import React,{Component} from 'react';
import { StyleSheet, View,TextInput,Text,Button,ScrollView,TouchableOpacity,Image,Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
const apiHost ='http://192.168.43.122:8000';// Update with ip of host in the network

export default class ShowCart extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            mid: props.mid,
            search: '',
            products: props.products ? props.products : [],
            data: [],
            disc: '',
            bAmount: 0,
            discount: 0,
            tAmount: 0,
        };
      }
    onSearch(search) {
      var data = this.state.data;
      var products = [];
      search = search.toLowerCase();
      console.log('Search :',search);
      data.forEach((p) => {
        if (p.cart > 0
        && ((p.name && p.name.toLowerCase().includes(search))
        || (p.price && p.price.toString().includes(search)))){
          products.push(p);
        }
      });
      this.setState({search,products});
    }
    goBack() {
      Actions.pop();
      setTimeout(() => {
        Actions.refresh({products: this.state.products});
      },500);
    }
    setDisc(disc) {
      if(disc > 100 || disc < 0) this.setState({disc: 0});
      else              this.setState({disc});
    }
    updateCart(index, offset) {
      var products = this.state.products;
      if (products[index].cart + offset < 1 || products[index].cart + offset > products[index].units)  return ;
      products[index].cart += offset;
      this.setState({products});
    }
    removeFromCart(index) {
      var product = this.state.products[index];
      product.cart = 0;
      this.setState({products: this.state.products});
    }
    viewCart(){
        var view = [];
        if(this.state.products === undefined || this.state.products === '' || this.state.products.length === 0) {
            return (
                <View key={0} style={styles.itemContainer}>
                  <Text style={styles.eText}>{"No Products Found"}</Text>
                </View>
            );
        }
        this.state.bAmount = 0;
        this.state.products.forEach((product, index) => {
            if(product.cart > 0) {
            this.state.bAmount += product.price * product.cart;
            view.push(
                <View key={product.name} style={styles.itemContainer}>
                  <View style={styles.item} onPress={() => this.select(product)}>
                    <Text style={styles.itemText}>{product.name}</Text>
                    <Text style={styles.itemText}>Rs. {product.price}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flex: 0.5}}>
                      <Text style={styles.itemText}>{product.units} N</Text>
                      </View>
                      <View style={{flex: 0.5}}>
                        <View style={{flexDirection: 'row-reverse'}}>
                            <View style={{flex: 0.2,paddingHorizontal: 5}}><Button color='#fbc41b' title={'+'} onPress={() => this.updateCart(index, +1)} /></View>
                            <View style={{flex: 0.4,paddingHorizontal: 5,alignItems: 'center'}}><Text style={styles.itemText}>{product.cart}</Text></View>
                            <View style={{flex: 0.2,paddingHorizontal: 5}}><Button color='#fbc41b' title={'-'} onPress={() => this.updateCart(index, -1)} /></View>
                            <View style={{flex: 0.2,paddingHorizontal: 5}}><Button color='#fbc41b' title={'x'} onPress={() => this.removeFromCart(index)}/></View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
            );
            }
        });
        
        if(view.length === 0) {
            view.push
            (
                <View key={0} style={styles.itemContainer}>
                    <Text style={styles.eText}>Cart Empty!{"\n\n"}Add Products to the Cart to view them Here</Text>
                </View>
            );
        }
        
        this.state.bAmount = (this.state.bAmount).toFixed(2);
        this.state.discount = (this.state.bAmount * (Number(this.state.disc) / 100)).toFixed(2);
        this.state.tAmount = (this.state.bAmount - this.state.discount).toFixed(2);

        return view;
    }
    makePayment() {
      var cart = [];
      this.state.products.forEach((p) => {
        if(p.cart > 0)  cart.push(p);
      })
      console.log({bill: {cart: cart, bAmount: this.state.bAmount, discount: this.state.discount, tAmount: this.state.tAmount}});
      Actions.searchCustomers({mid: this.state.mid, bill: {cart: cart, bAmount: this.state.bAmount, discount: this.state.discount, tAmount: this.state.tAmount}});
    }
    render() {
        return(
        <View style={styles.container}>
          <View style={styles.searchContainer}>
          <TextInput
            value={this.state.search}
            onChangeText={(search) => {this.onSearch(search);}}
            placeholder={'Search Product in Cart'}
            keyboardType='default'
            style={styles.search}
          />
          {/* <Button
            title={'Search'}
            onPress={this.onSearch.bind(this)}
          /> */}
          </View>
          <View style={styles.listContainer}>
            <ScrollView style={styles.list}>
              {this.viewCart()}
            </ScrollView>
          </View>
          <View style={styles.textContainer}>
            <View style={{flex: 0.5, paddingHorizontal: 10}}>
              <Text style={{fontSize: 16}}>Add Discount(%) : </Text>
            </View>
            <View style={{flex: 0.5,alignItems:'flex-end', paddingHorizontal: 10}}>
              <TextInput style={{borderBottomWidth: 1,paddingHorizontal: 10, textAlign: 'right'}}
                placeholder={'Discount in %'}
                value={this.state.disc}
                onChangeText={(disc) => this.setDisc(disc)}
                keyboardType='number-pad'
              />
            </View>
          </View>
          <View style={styles.textContainer}>
            <View style={{flex: 0.5, paddingHorizontal: 10}}>
              <Text style={{fontSize: 16}}>Bill Amount : </Text>
            </View>
            <View style={{flex: 0.5,alignItems:'flex-end', paddingHorizontal: 10}}>
              <Text style={{fontSize: 16}}>{this.state.bAmount}</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <View style={{flex: 0.5, paddingHorizontal: 10}}>
              <Text style={{fontSize: 16}}>Disc. Amount : </Text>
            </View>
            <View style={{flex: 0.5,alignItems:'flex-end', paddingHorizontal: 10}}>
              <Text style={{fontSize: 16}}>{this.state.discount}</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <View style={{flex: 0.5, paddingHorizontal: 10}}>
              <Text style={{fontSize: 16}}>Total Amount : </Text>
            </View>
            <View style={{flex: 0.5,alignItems:'flex-end', paddingHorizontal: 10}}>
              <Text style={{fontSize: 16}}>{this.state.tAmount}</Text>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <View style={{flex: 0.5, padding: 5}}>
              <Button
                color='#fbc41b'
                title={'Add More Products'}
                onPress={() => this.goBack()}
              />
            </View>
            <View style={{flex: 0.5, padding: 5}}>
              <Button
                color='#fbc41b'
                title={'Make Payment'}
                onPress={() => this.makePayment()}
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
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  searchContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    flex: 1,
    fontSize: 14,
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    margin: 5,
    fontSize: 16,
  },
  searchIcon: {
    padding: 5,
    borderRadius: 30,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    marginTop: 5,
  },
  list: {
    flex: 1,
    flexDirection: 'column',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    elevation: 2,
    marginBottom: -10,
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  itemText: {
    fontSize: 20,
  },
  eText: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 10,
    marginBottom: 5,
    marginTop: -5,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 5,
    marginBottom: 5,
    marginTop: -5,
  },
});