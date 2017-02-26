// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export default class ViewFlightsScreen extends React.Component {
  constructor({props}){
    super(props);
  }
  static navigationOptions = {
    title: 'Flights at risk',
  };
  render() {
    return <Text>View Flights Screen!</Text>;
  }
}

const styles = StyleSheet.create({
});