import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput } from 'react-native';




export default class Otp extends Component {
constructor(props){
    super(props);
    this.state={
     pin1 : "",
     pin2 : "",
     pin3 : "",
     pin4 : ""
    }
}
componentDidMount=()=>{
    this.refs.pin1ref.focus();
}
render(){
  return (
    <View style={styles.container}>
        <View style={{flex:0.6,justifyContent:'space-evenly',flexDirection:'row'}}>
        <TextInput
            ref={"pin1ref"}
            onChangeText={(pin1)=>{
            this.setState({pin1:pin1})
            if(pin1!=""){
                this.refs.pin2ref.focus();
            }
            }}
            value={this.state.pin1}
            maxLength={1}
            keyboardType='number-pad'
            style={{
            backgroundColor:`#f5f4f2`,
            fontWeight:"600",
            alignSelf:'center',
            padding:10,
            fontSize: 20,
            height: 55,
            width: '10%',
            borderRadius:10,
            borderWidth:0.5,
            borderColor: 'grey',
            alignContent:"center",
        }}

        />
        <TextInput
            ref={"pin2ref"}
            onChangeText={(pin2)=>{
                this.setState({pin2:pin2})
                if(pin2!=""){
                    this.refs.pin3ref.focus();
                }
                }}
            value={this.state.pin2}
            maxLength={1}
            keyboardType='number-pad'
            style={{backgroundColor:`#f5f4f2`,fontWeight:"600",alignSelf:'center',
            padding:10,
            fontSize: 20,
            height: 55,
            width: '10%',
            borderRadius:10,
            borderWidth:0.5,
            borderColor: 'grey',
            alignContent:"center",
        }}
        />
        <TextInput
            ref={"pin3ref"}
            onChangeText={(pin3)=>{
                this.setState({pin3:pin3})
                if(pin3!=""){
                    this.refs.pin4ref.focus();
                }
                }}
            keyboardType='number-pad'
            value={this.state.pin3}
            maxLength={1}
            style={{backgroundColor:`#f5f4f2`,
            fontWeight:"600",
            alignSelf:'center',
            padding:10,
            fontSize: 20,
            height: 55,
            width: '10%',
            borderRadius:10,
            borderWidth:0.5,
            borderColor: 'grey',
            alignContent:"center",
        }}
        />
        <TextInput
            ref={"pin4ref"}
            onChangeText={(pin4)=>{
                this.setState({pin4:pin4})
                if(pin4!=""){
                    //this.refs.pin2ref.focus();
                    alert('Pin Submitted');
                }
                }}
            value={this.state.pin4}
            maxLength={1}
            keyboardType='number-pad'
            style={{backgroundColor:`#f5f4f2`,fontWeight:"600",alignSelf:'center',
            padding:10,
            fontSize: 20,
            height: 55,
            width: '10%',
            borderRadius:10,
            borderWidth:0.5,
            borderColor: 'grey',
            alignContent:"center"
        }}
        />
        </View>
    </View>
  );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

module.exports = Otp;
