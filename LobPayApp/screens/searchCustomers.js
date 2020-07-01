import React,{Component} from 'react';
import { StyleSheet, View,TextInput,Text,Button,ScrollView,TouchableOpacity,Image,Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
const apiHost ='http://192.168.18.4:8000';// Update with ip of host in the network

export default class SearchCustomers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            customers: [   // Dummy Data for testing without API
                {
                    username: "msy",
                    mobile: 1,
                    id: 2
                },
                {
                    username: "msr",
                    mobile: 2,
                    id: 3
                }
            ],
            data: [],
            bill: props.bill ? props.bill : undefined,
        };
      }
    componentDidMount() {
        this.setState({data : this.state.customers}); // Dummy Data for test
        fetch(apiHost + '/subscribe/customerlist/1', {method: 'GET'})
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({data : responseJson, customers : responseJson});
            console.log('data :',this.state.data);
          })
          .catch((e) => {
            console.log(e.message);
            Alert.alert(e.message);
          });
    }
    onSearch(search) {
      var data = this.state.data;
      var customers = [];
      console.log('Search :',search);
      data.forEach((c) => {
        if((c.username && c.username.includes(search))
        || (c.mobile && c.mobile.toString().includes(search))
        || (c.id && c.id.toString().includes(search))){
          customers.push(c);
        }
      });
      this.setState({search,customers});
    }
    goBack() {
        Actions.pop();
    }
    payMerchant(customer) {
      console.log(customer);
      Actions.payMerchant({customer: customer,bill: this.state.bill});
    }
    viewCustomers(){
        var view = [];
        if(this.state.customers === undefined || this.state.customers === '' || this.state.customers.length === 0) {
            if(this.state.search === '') {
                return (
                    <View style={styles.itemContainer,{textAlign:'center'}}>
                      <Text style={styles.eText}>No Subscribed Customers</Text>
                      <TouchableOpacity onPress={() => this.payMerchant()}>
                        <Text style={[styles.eText,{color: '#12799f',}]}>{"\n"}Make Payment for new Customer</Text>
                      </TouchableOpacity>
                    </View>
                );
            }
            return (
                <View style={styles.itemContainer}>
                  <Text style={styles.eText}>No Customer Record Found</Text>
                  <TouchableOpacity onPress={() => this.payMerchant()}>
                    <Text style={[styles.eText,{color: '#12799f',}]}>Make Payment for new Customer</Text>
                  </TouchableOpacity>
                </View>
            );
        }
        view.push(
        <View style={styles.itemContainer}>
          <TouchableOpacity onPress={() => this.payMerchant()}>
            <Text style={[styles.eText,{color: '#12799f',}]}>Make Payment for new Customer</Text>
          </TouchableOpacity>
        </View>
        );
        for(var i=0;i<1;i++) { // Testing inner scrolling
        this.state.customers.forEach((customer) => {
            view.push(
                <View key={i*10+customer.id} style={styles.itemContainer}>
                  <TouchableOpacity style={styles.item} onPress={() => this.payMerchant(customer)}>
                    <Text style={styles.itemText}>{customer.username}</Text>
                    <Text style={styles.itemText}>{customer.mobile}</Text>
                  </TouchableOpacity>
                </View>
            );
        });
        }
        return view;
    }
    render() {
        return(
        <View style={styles.container}>
          <View style={styles.searchContainer}>
          <TextInput
            value={this.state.search}
            textContentType='telephoneNumber'
            onChangeText={(search) => {this.onSearch(search);}}
            placeholder={'Search Subscribed Customer'}
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
              {this.viewCustomers()}
            </ScrollView>
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
    fontSize: 15,
    textAlign: 'center',
  }
});