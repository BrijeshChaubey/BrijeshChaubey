import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Avatar, Appbar} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserCardComponent} from './UserCardComponent';
export class AddFeedbackPage extends React.Component {
  constructor() {
    super();
    this.state = {
      loginData: {},
      receivedData: [],
    };
  }

  async componentDidMount() {
    try {
      console.log('arrive in addFeedback');
      const Value = await AsyncStorage.getItem('LOGIN');
      const data = Value != null ? JSON.parse(Value) : null;
      this.setState({loginData: data});
      console.log('value=', data);
      let that = this;
      this.getReceiver(data.token, that);
    } catch (error) {
      console.log(error);
    }
  }

  getReceiver(token, that) {
    console.log('getreceiver', token);
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    axios
      .post(
        'https://quiet-harbor-07900.herokuapp.com/GetAllRecievers',
        {
          token: 'Bearer' + token,
        },
        config,
      )
      .then(function (response) {
        console.log('response=>', response.data);
        /*      let data = (response.data.length = 2); */
        /*     console.log('data=>', data); */
        that.setState({receivedData: response.data});
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    function Item(item, name) {
      return (
        <View style={{ backgroundColor: 'gray'}}>
         <UserCardComponent name={item.name}/>
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
        <Appbar style={AddFeadback.navbar}>
          <View>
            <Avatar.Image size={30} />
          </View>
          <View style={AddFeadback.MyName}>
            <Text>
              
              {this.state.loginData.name
                ? this.state.loginData.name
                : 'loading'}
            </Text>
          </View>
          <View style={AddFeadback.rightNavbar}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}>
              <Text style={AddFeadback.Logoutbtn}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Appbar>

        <FlatList
          style={{flex: 1}}
          data={this.state.receivedData}
          /*  renderItem={({item}) => <Item name={item.name} />} */
          /*   data={[1, 2, 3, 4, 5, 6, 7]} */
          renderItem={({item}) => <Item name={item.name} />}
        />
      </View>
    );
  }
}

const AddFeadback = StyleSheet.create({
  navbar: {
    height: 60,
    border: 'solid',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'purple',
  },
  ProfilePic: {
    justifyContent: 'flex-start',
    position: 'relative',
  },

  MyName: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    marginLeft: 10,
  },
  rightNavbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: 190,
  },
  Logoutbtn: {
    justifyContent: 'flex-end',
    backgroundColor: 'red',
    justifyContent: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
    padding: 6,
    borderRadius: 8,
    color: 'white',
  },
});
