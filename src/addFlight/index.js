import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export default class AddFlightScreen extends React.Component {
  constructor({props}){
    super(props);
  }
  static navigationOptions = {
    title: 'Add Flight',
  };
  render() {
    return <Text>Add Flight Screen!</Text>;
  }
}

const styles = StyleSheet.create({
});