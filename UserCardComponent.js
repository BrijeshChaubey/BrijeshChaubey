import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { TouchableOpacity} from 'react-native-gesture-handler';
import {Avatar, Button, Card,TextInput, FAB, Image} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { black } from 'react-native-paper/lib/typescript/styles/colors';
export class UserCardComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      textLength: 0,
      loginUserData: {},
      feadback: '',
      email: '',
      token: '',
    };
  }
  async componentDidMount() {
    try {
      console.log('arrive in component');
      const Value = await AsyncStorage.getItem('LOGIN');
      const data = Value != null ? JSON.parse(Value) : null;
      this.setState({loginUserData: data});
      console.log('item=>', this.props);
      /*     console.log('loginData=', data); */
      this.setState({token: data.token});
    } catch (error) {
      console.log(error);
    }
  }
  GetCharFunction = text => {
    var countCharacter = text.length.toString();
    this.setState({textLength: countCharacter});
    this.setState({feadback: this.state.text});
    console.log('getchar');
  };

  onSubmitFeedback(token) {
    console.log('arrived in on submit');
    console.log('userdata=>', this.state.loginUserData.token);
    console.log('email=>', this.props.email);
    /*   const config = {
      headers: {Authorization: `Bearer ${token}`},
    }; */
    axios
      .post(
        'https://quiet-harbor-07900.herokuapp.com/feedback/post_addFeadback',
        {
          token: this.state.loginUserData.token,
          email: this.state.email,
          /*     token: 'Bearer' + token, */
          feadback: this.feadback,
        },
      )
      .then(function (response) {
        console.log('response', response);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  }

  render() {
    return (
      <View style={{alignSelf: 'center'}}>
        <Card style={cardStyles.container}>
          <Avatar.Image size={50} style={cardStyles.fab}>
            {this.props.profile}
          </Avatar.Image>
          <Text style={cardStyles.cardName}>{this.props.name}</Text>
          <TextInput
            placeholder="Write your feedback here..."
            style={cardStyles.cardTxtInput}
            maxLength={100}
            value={this.state.text}
            onChangeText={text => {
              this.GetCharFunction(text);
            }}></TextInput>

          <View
            style={{
              marginTop: 10,
              position: 'relative',
            }}>
            <View style={cardStyles.cardMaxChar}>
              <Text style={cardStyles.text}>Max 100 characters</Text>
            </View>
            <View style={cardStyles.cardCountChar}>
              <Text style={cardStyles.text}>{this.state.textLength} / 100</Text>
            </View>
          </View>

          <TouchableOpacity
            onPressIn={() => {
              if (this.onSubmitFeedback()) {
                this.setState({feadback: ''});
                console.log('arrive');
              }
            }}
            style={cardStyles.cardBtn}>
            <Text style={{color: 'white', fontSize: 10}}>Submit Feedback</Text>
          </TouchableOpacity>
        </Card>
      </View>
    );
  }
}
const cardStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: 400,
    height: 350,
    borderWidth: 2,
    margin: 15,
  },
  fab: {
    position: 'relative',
    alignSelf: 'center',
    marginTop: 50,
  },
  cardName: {
    size:30,
    color:'black',
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
    width: 300,
  },
  cardMaxChar: {
    position: 'relative',
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 15,
  },
  text: {
    fontSize: 14,
    color:'black',
    padding: 5,
  },

  cardCountChar: {
    position: 'absolute',
    alignSelf: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    paddingRight: 10,
  },

  cardBtn: {
    backgroundColor: 'blue',
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 40,
    padding: 12,
    borderRadius: 5,
  },
});
