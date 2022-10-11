import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

import {TextInputComponent} from './TextInputComponent';

export class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      Password: '' ,
      secureTextEntry: true,
      loginData:[]

    };
  }
    onChangeEmail = email => {
      this.setState({email: email});
    };
  
    onChangePassword = Password => {
      this.setState({Password: Password});
    };
  
    onSubmit = async () => {
      console.log('arive in onsubmit');
      var emailpattern =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  
      if (emailpattern.test(this.state.email) === true) {
        console.log(this.state.email, this.state.Password);
        return axios
          .post('https://quiet-harbor-07900.herokuapp.com/DeveloperSignin', {
            email: this.state.email,
            password: this.state.Password,
          })
          .then(function (response) {
            console.log('response', response);
            console.log('response received');
          LoginData = response = {
            name: response.data.UserLogin.name,
            profile: response.data.UserLogin.profile,
            Feadbacks: response.data.UserLogin.Feadbacks,
            token: response.data.UserLogin.token,
            email: response.data.UserLogin.email,
          };
          console.log('LoginData=>', LoginData);
          try {
            console.log('arrived in set');
            const setLoginData = JSON.stringify(LoginData);
            AsyncStorage.setItem('LOGIN', setLoginData);
            console.log('setLoginData=>', setLoginData);
            return true;
          } catch (error) {
            console.log(error);
            return false;
          }
          })
          .catch(function (error) {
            console.log('error', error);
            return false
          });
      } else {
        console.warn('plz checked the email');
        alert('Incorrect Email');
        return false
      }
    };
  render() {
    return (
      <View style={styles.container}>
        
        <Text style={styles.text}>Login</Text>
        
        <TextInputComponent
          label="Email*"
          value={this.state.email}
          onChangeText={this.onChangeEmail}
        />
        <TextInputComponent
          label=" Password"
          value={this.state.Password}
          onChangeText={this.onChangePassword}
          secureTextEntry={this.state.secureTextEntry}
        />

        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => {
            if(this.onSubmit()){
              this.props.navigation.navigate('Dashboard')  
            }
            
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyle1} onPress={() => {this.props.navigation.push('RegisterPage');
          }}><Text style={{color: 'white', textAlign: 'center'}}>Signup</Text></TouchableOpacity>
         
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
    color:'brown',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 80,
  },
  container: {
    backgroundColor: 'white',
    width: 320,
    height: 500,
    borderWidth: 2,
    margin: 15,
  },

  btnStyle1: {
    backgroundColor: 'blue',
    marginLeft:40,
    marginTop: 10,
    marginRight: 40,
    padding: 12,
    borderRadius: 5,
 
  },
  btnStyle: {
    backgroundColor: 'blue',
   marginLeft:40,
    marginTop: 10,
    marginRight: 40,
    padding: 12,
    borderRadius: 5,
  },
});
