import React, { Component } from 'react'
import {
  // StyleSheet,
  View,
  Button
} from 'react-native'

export default class HomeActionButtons extends Component {
  constructor ({ props }) {
    super(props)
  }
  static navigationOptions = {
    title: 'Dont F Up Your Flight'
  }
  render () {
    const { navigate } = this.props
    return (
      <View>
        <Button
          onPress={() => navigate('AddFlight')}
          title='Add Flight'
            />
        <Button
          onPress={() => navigate('AllFlights')}
          title='View Flights at risk'
            />
      </View>
    )
  }
}

// const styles = StyleSheet.create({
// })
