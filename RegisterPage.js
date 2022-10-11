import React from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import {TextInputComponent} from './TextInputComponent';

export class RegisterPage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      validated: false,
      ProfileImage: {},
      EmployeeName: '',

    };
  }
 
  onChangeEmail = email => {
    this.setState({email: email});
  };
  onChangeName = EmployeeName => {
    this.setState({EmployeeName: EmployeeName});
  };

  selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      this.setState({ProfileImage: image});
    });
  };
  onSubmit = (email, name, profileImage) => {
    console.log('arive');
    var emailpattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    if (emailpattern.test(this.state.email) === true) {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data; charset=utf-8;',
        },
      };
      console.log(this.state.ProfileImage);
      const imageData = new FormData();
      imageData.append('email', this.state.email);
      imageData.append('name', this.state.EmployeeName);
      imageData.append('profileImage', {
        uri: this.state.ProfileImage.path,
        type: this.state.ProfileImage.mime,
        name: 'image.jpg',
        filename: '5quhhz.jpg',
      });
      console.log('arrived in onsubmit if condition');
      console.log(imageData);

      console.log(this.state.email, this.state.EmployeeName);
      axios
        .post(
          'https://quiet-harbor-07900.herokuapp.com/register',
          imageData,
          config,
        )
        .then(function (response) {
          console.log('response', response);
          console.log('response received');
        })
        .catch(function (error) {
          console.log('error', error);
        });
        this.props.navigation.push('Login');
    } else {
      alert('Incorrect Email');
    }
    
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Enter New Developer</Text>
        <TextInputComponent
          label="Employee Name*"
          value={this.state.EmployeeName}
          onChangeText={this.onChangeName}
        />
        <TextInputComponent
          label="Email*"
          value={this.state.email}
          onChangeText={this.onChangeEmail}
        />
          <TouchableOpacity
          style={styles.chooseFilebtn}
          onPress={() => {
            this.selectImage();
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>Choose File</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => {
            this.onSubmit();
            
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>Submit</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
    color:'black',
    marginTop: 50,
    fontSize:30,
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: 320,
    height: 500,
    borderWidth: 2,
    margin: 15,

    justifyContent: 'center',
  },
  btnStyle: {
    backgroundColor: 'blue',
    marginTop: 25,
    width: 120,
    fontSize: 10,
    padding: 12,
    borderRadius: 5,
  },
  btnStyle2: {
    backgroundColor: 'red',
    width: 120,
    fontSize: 10,
    padding: 7,
  },
  chooseFilebtn: {
    width: 90,
    height: 30,

    padding: 1,
    backgroundColor: 'red',
    marginTop: 3,
    marginLeft: 40,
    alignSelf: 'flex-start',
  },
});
