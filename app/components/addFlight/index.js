import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Add Flight'
  }
  render () {
    return (
      <View>
        <Text>Add Flight</Text>
      </View>
    )
  }
}
