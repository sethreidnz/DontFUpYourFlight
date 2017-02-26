import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

// import the screens for the app
import HomeScreen from './home';
import AddFlight from './addFlight';
import ViewFlights from './viewFlights';

export default RootComponent = StackNavigator(
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