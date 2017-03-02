import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';

import { Provider } from 'react-redux'
import store from './store'
import firebaseConfig from './firebase.json';

// import the screens for the app
import HomeScreen from './containers/home'
import LoginScreen from './containers/auth/Login'
import SignUpScreen from './containers/auth/SignUp'

const RootComponent = StackNavigator(
  // Navigation route definitions
  {
    Home: { screen: HomeScreen },
    LogIn: { screen: LoginScreen },
    SignUp: { screen: SignUpScreen }
  },
  // StackNavigatorConfig object
  {
    headerMode: 'float'
  }
);

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = { loaded: false }
  }
  componentWillMount() {
  }
  render(){
    return (
      <Provider store={store}>
        <RootComponent store={store}/>
      </Provider>
    )
  }
}