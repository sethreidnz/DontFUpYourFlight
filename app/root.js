import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';

import { Provider } from 'react-redux'
import store from './store'
import firebaseConfig from './firebase.json';

// import the screens for the app
import HomeScreen from './containers/Home'
import LoginScreen from './containers/Account/Login'
import AddFlightScreen from './containers/AddFlight'
import ViewFlightsScreen from './containers/ViewFlights'

const RootComponent = StackNavigator(
  // Navigation route definitions
  {
    Home: { screen: HomeScreen },
    SignUp: { screen: ViewFlightsScreen },
    LogIn: { screen: ViewFlightsScreen },
    AddFlight: { screen: AddFlightScreen },
    AllFlights: { screen: ViewFlightsScreen }
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
    // firebase.initializeApp(firebaseConfig);

    // firebase.auth().onAuthStateChanged((user) => {
    //   this.setState({ loaded: true });

    //   if (user) {
    //     store.dispatch({ type: SIGN_IN_SUCCESS, payload: user });
    //   }
    // });
  }
  render(){
    return (
      <Provider store={store}>
        <RootComponent store={store}/>
      </Provider>
    )
  }
}