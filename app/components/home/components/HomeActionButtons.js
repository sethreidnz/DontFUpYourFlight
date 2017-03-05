import React, { Component, PropTypes } from 'react'
import {
  // StyleSheet,
  View,
  Button
} from 'react-native'

export default class HomeActionButtons extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }
  static navigationOptions = {
    title: 'Dont F Up Your Flight'
  }
  render () {
    const { navigation } = this.props
    return (
      <View>
        <Button
          onPress={() => navigation.navigate('AddFlight')}
          title='Add Flight'
            />
        <Button
          onPress={() => navigation.navigate('AllFlights')}
          title='View Flights at risk'
            />
      </View>
    )
  }
}

// const styles = StyleSheet.create({
// })
