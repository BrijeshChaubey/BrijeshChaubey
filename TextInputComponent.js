import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    
    StyleSheet,
  } from 'react-native';
  import {Avatar, Button, Card,TextInput, FAB, Image} from 'react-native-paper';
  
export class TextInputComponent extends React.Component {
    render(){
        return(
         <View
          style={{
              alignItems:'center',
          }}>
              <TextInput
              label={this.props.label}
              value={this.props.value}
              secureTextEntry={this.props.true}
              onChangeText={
                this.props.onChangeText
              }
              style={{
                color:'black',

                backgroundColor: 'white',
                
                borderBottomWidth: 1,
                
                borderBottomColor: "gray",
                
                margin: 15,
                
                width: 250,
                
                paddingBottom: 4,
              }}></TextInput></View>   
        );
    }
}
const styles= StyleSheet.create({
    onchange: {
        borderBottomColor: 'red',
    },
});
