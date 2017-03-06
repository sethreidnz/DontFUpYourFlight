import React, { Component, PropTypes } from 'react'
import {
  // StyleSheet,
  View,
  Button
} from 'react-native'

export default class HomeActionButtons extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  }
  static navigationOptions = {
    title: 'Dont F Up Your Flight'
  }
  render () {
    const { navigation, logout } = this.props
    return (
      <View>
        <Button
          onPress={() => navigation.navigate('AddFlight')}
          title='Add Flight'
            />
        <Button
          onPress={() => navigation.navigate('ViewFlights')}
          title='View Flights at risk'
            />
        <Button
          onPress={() => logout()}
          title='Log Out'
            />
      </View>
    )
  }
}

// const styles = StyleSheet.create({
// })
