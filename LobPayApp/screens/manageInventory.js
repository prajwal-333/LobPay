import React,{Component} from 'react';
import { StyleSheet, View,TextInput,Text,Button,ScrollView,TouchableOpacity,Image,Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
const apiHost ='http://192.168.43.122:8000';// Update with ip of host in the network

export default class ManageInventory extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            mid: props.mid,
            search: '',
            products: props.products ?  props.products : [],
            data: [],
        };
      }
    componentDidMount() {
        fetch(apiHost + '/inv/merchantInventory/' + this.state.mid, {method: 'GET'})
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({data : responseJson, products : responseJson});
            console.log('data :',this.state.data);
          })
          .catch((e) => {
            console.log(e.message);
            Alert.alert(e.message);
          });
    }
    onSearch(search) {
      var data = this.state.data;
      var products = [];
      search = search.toLowerCase();
      console.log('Search :',search);
      data.forEach((p) => {
        if((p.name && p.name.toLowerCase().includes(search))
        || (p.price && p.price.toString().includes(search))){
          products.push(p);
        }
      });
      this.setState({search,products});
    }
    goBack() {
      Actions.pop();
    }
    addProduct(){
      console.log('Add Product');
      Actions.addProduct({mid:this.state.mid, products: this.state.data});
    }
    updateProduct(index) {
      console.log('Edit Product',this.state.data[index]);
      Actions.push('addProduct',{title: 'Update Product', mid:this.state.mid, edit: index,products: this.state.data});
    }
    viewProducts(){
        var view = [];
        if(this.state.data === undefined || this.state.data === '' || this.state.data.length === 0) {
            return (
                <View style={styles.itemContainer}>
                    <Text style={styles.eText}>Inventory Empty!{"\n\n"}Add Products to the Inventory to view them Here</Text>
                </View>
            );
        }
        if(this.state.products === undefined || this.state.products === '' || this.state.products.length === 0) {
            return (
                <View style={styles.itemContainer}>
                  <Text style={styles.eText}>"No Products Found"</Text>
                </View>
            );
        }
        this.state.products.forEach((product, index) => {
            view.push(
                <View key={product.name} style={styles.itemContainer}>
                  <TouchableOpacity style={styles.item} onPress={() => this.updateProduct(index)}>
                    <Text style={styles.itemText}>{product.name}</Text>
                    <Text style={styles.itemText}>Rs. {product.price}</Text>
                    <Text style={styles.itemText}>{product.quantity} N</Text>
                  </TouchableOpacity>
                </View>
            );
        });
        return view;
    }
    render() {
        return(
        <View style={styles.container}>
          <View style={styles.searchContainer}>
          <TextInput
            value={this.state.search}
            onChangeText={(search) => {this.onSearch(search);}}
            placeholder={'Search Product'}
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
              {this.viewProducts()}
            </ScrollView>
          </View>
          <View style={styles.buttonsContainer}>
            <View style={{flex: 0.5, padding: 5}}>
            </View>
            <View style={{flex: 0.5, padding: 5}}>
              <Button
                title={'Add Product'}
                onPress={() => this.addProduct()}
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
    fontSize: 20,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginBottom: 5,
  },
});