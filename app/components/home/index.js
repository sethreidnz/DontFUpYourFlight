import React, { Component, PropTypes } from 'react'
import {
  StyleSheet
} from 'react-native'

import HomeActionButtons from './components/HomeActionButtons'

export default class HomeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }
  static navigationOptions = {
    title: 'Dont F Up Your Flight'
  }
  render () {
    const { navigation } = this.props
    return <HomeActionButtons navigation={navigation} />
  }
}
