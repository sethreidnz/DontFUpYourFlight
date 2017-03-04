import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native'

export default class AuthScreen extends React.Component {
  constructor({props}){
    super(props)
  }
  static navigationOptions = {
    title: 'Sign Up',
  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
})