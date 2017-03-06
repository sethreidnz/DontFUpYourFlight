import React, { Component, PropTypes } from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import moment from 'moment'

import { Spinner } from '../shared'

export default class HomeScreen extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      getUsersFlights: PropTypes.func.required
    }),
    isFetching: PropTypes.bool.isRequired,
    hasLoaded: PropTypes.bool.isRequired,
    isInvalidated: PropTypes.bool.isRequired,
    flights: PropTypes.array.isRequired
  }
  static navigationOptions = {
    title: 'Flights at risk'
  }
  componentWillMount = () => {
    const { actions: { getUsersFlights } } = this.props
    getUsersFlights()
  }
  render = () => {
    const { flights, isFetching, hasLoaded } = this.props
    if (isFetching) {
      return <Spinner />
    }
    if (hasLoaded && flights.length < 1) {
      return <Text>You don't have any flights yet</Text>
    }
    return (
      <ScrollView style={styles.container}>
        {flights.map((flight) => (
          <View style={[styles.listItem, styles.container]} key={flight.id} >
            <Text style={styles.label}>Departing Airport</Text>
            <Text>{flight.departingAirport.name}</Text>
            <Text style={styles.label}>Departing Time</Text>
            <Text>{moment(new Date(flight.departingDateTime)).format('dddd, MMMM Do YYYY, h:mm:ss a')}</Text>
            <Text style={styles.label}>Returning Airport</Text>
            <Text>{flight.destinationAirport.name}</Text>
            <Text style={styles.label}>Returning Time</Text>
            <Text>{moment(new Date(flight.returningDateTime)).format('dddd, MMMM Do YYYY, h:mm:ss a')}</Text>
          </View>
        ))}
      </ScrollView>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listItem: {
    borderWidth : 1,
    marginTop: 5,
    marginBottom: 5,
    padding: 5
  },
  label:{
    fontWeight : 'bold'
  }
})
