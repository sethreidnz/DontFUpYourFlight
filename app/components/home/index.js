import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import HomeActionButtons from './components/HomeActionButtons'

export default class HomeScreen extends React.Component {
  constructor({props}){
    super(props);
  }
  static navigationOptions = {
    title: 'Dont F Up Your Flight',
  };
  render() {
    const { navigate } = this.props.navigation;
    return <HomeActionButtons />
  }
}

const styles = StyleSheet.create({
});