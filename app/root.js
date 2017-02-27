import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

// redux
import { Provider } from 'react-redux'
import store from './store'

// import the screens for the app
import HomeScreen from './home';
import AddFlight from './addFlight';
import ViewFlights from './viewFlights';

const RootComponent = StackNavigator(
  // Navigation route definitions
  {
    Home: { screen: HomeScreen },
    AddFlight: { screen: AddFlight },
    AllFlights: { screen: ViewFlights }
  },
  // StackNavigatorConfig object
  {
    headerMode: 'float'
  }
);

export default class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <RootComponent store={store}/>
      </Provider>
    )
  }
}