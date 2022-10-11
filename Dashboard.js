import React,{Component} from "react";
import { Avatar, Card, FAB, Appbar} from 'react-native-paper';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import{
  View,Text,TextInput,Button,StyleSheet, Touchable,  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {FlatList} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FeedbackComponent} from './FeedbackComponent';




export class  Dashboard extends React.Component{
  constructor() {
    super();
    this.state = {
      loginData: {},
    };
  }

  async componentDidMount() {
    try {
      console.log('arrive in get');
      const Value = await AsyncStorage.getItem('LOGIN');
      const data = Value != null ? JSON.parse(Value) : null;
      this.setState({loginData: data});
      console.log('value=', data);
    } catch (error) {
      console.log(error);
    }
  }

  
    render() {
      function Item({item,name,date, feadback}) {
        return (
          <ScrollView>
            <FeedbackComponent 
            feadback={feadback}
            SentBy={name} 
            postedon={date}/>
          </ScrollView>
        );
      }
  
      return(
        <View>        
          <View><Appbar.Header style={{backgroundColor:'blue'}}>
       
       
        <Avatar.Image
                        source={{uri:"https://www.facebook.com/photo/?fbid=2970657593208847&set=a.1379077165700239"}}
                        size={50} style={cardStyles.fab} 
                        />
           <TouchableOpacity ><Text style={{color: 'black', textAlign: 'center'}}> {this.state.loginData.name
                ? this.state.loginData.name
                : 'loading'}</Text></TouchableOpacity>              
         <TouchableOpacity style={cardStyles.chooseFilebtn} onPress={() => {this.props.navigation.navigate('AddFeedbackPage');
          }}><Text style={{color: 'black', textAlign: 'center'}} 
         >Add Feedback</Text></TouchableOpacity>                
         <TouchableOpacity style={cardStyles.chooseFilebtn2}onPress={() => {this.props.navigation.push('Login');
          }}><Text style={{color: 'black', textAlign: 'center'}}>log out</Text></TouchableOpacity> 
                      
       
      </Appbar.Header></View>
      <FlatList
          data={
            this.state.loginData.Feadbacks ? this.state.loginData.Feadbacks : []
          }
          renderItem={({item}) => (
            <Item feadback={item.feadback} name={item.name} date={item.date} />
          )}
        />
      
      </View>

      )
      
      }
  }
  const cardStyles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      width: 450,
      height: 300,
      borderWidth: 2,
      margin: 15,
    },
    fab: {
      position: 'relative',
      alignSelf: 'center',
      color:"red"
    },
    cardName: {
      marginTop: 10,
      textAlign: 'center',
      position: 'relative',
    },
    cardTxtInput: {
      alignSelf: 'center',
      position: 'relative',
      padding: 10,
      marginTop: 30,
      backgroundColor: 'white',
      borderWidth: 0.3,
      borderColor: 'gray',
      width: 180,
    },
    cardMaxChar: {
      position: 'relative',
      alignSelf: 'flex-start',
      display: 'flex',
      flexDirection: 'row',
      marginLeft: 15,
    },
    text: {
      fontSize: 10,
      padding: 5,
      color: 'black'
    },
  
    cardCountChar: {
      position: 'absolute',
      alignSelf: 'flex-end',
      display: 'flex',
      flexDirection: 'row',
      paddingRight: 10,
    },
  
    cardBtn: {
      backgroundColor: 'pink',
      alignSelf: 'flex-end',
      marginTop: 10,
      marginRight: 20,
      padding: 8,
      borderRadius: 5,
    },
    chooseFilebtn: {
      width: 90,
      height: 30,
  
      padding: 1,
      backgroundColor: 'red',
      marginTop: 10,
      marginLeft: 40,
      alignSelf: 'flex-start',
    },
    chooseFilebtn2: {
      width: 90,
      height: 30,
  
      padding: 7,
      backgroundColor: 'red',
      marginTop: 10,
      marginLeft: 40,
      alignSelf: 'flex-start',
    },
  });
  
  
