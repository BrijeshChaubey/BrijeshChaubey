import react from "react";
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { RegisterPage } from './RegisterPage';
import {Login} from "./Login";
import {Dashboard} from "./Dashboard";
import {AddFeedbackPage} from "./AddFeedbackPage";
const AppNavigator = createStackNavigator({
    
    Login: {
        screen: Login,
      },
    RegisterPage: {
        screen: RegisterPage,
      },
    Dashboard: {
        screen: Dashboard,
          navigationOptions:{
           header:null,
          
        },
      },
    AddFeedbackPage: {
        screen: AddFeedbackPage,
      },  
  });
  
  export default createAppContainer(AppNavigator);