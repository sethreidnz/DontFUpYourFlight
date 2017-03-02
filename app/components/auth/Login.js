import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class Login extends React.Component {
  constructor({props}){
    super(props);
  }
  static navigationOptions = {
    title: 'Login',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});