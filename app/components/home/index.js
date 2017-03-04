import React, { Component } from 'react'
import {
  StyleSheet
} from 'react-native'

import HomeActionButtons from './components/HomeActionButtons'

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Dont F Up Your Flight'
  }
  render () {
    return <HomeActionButtons />
  }
}

// const styles = StyleSheet.create({
// })
