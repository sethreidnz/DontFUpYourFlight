import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { showNotification, createScheduledNotification } from '../shared/notifications';

export default class HomeScreen extends React.Component {
  constructor({props}){
    super(props);
  }
  static navigationOptions = {
    title: 'Dont F*** Up Your Flight',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
          onPress={() => navigate('AddFlight')}
          title="Add Flight"
        />
        <Button
          onPress={() => navigate('AllFlights')}
          title="View Flights at risk"
        />
        <Button
          onPress={() => createScheduledNotification()}
          title="Create notification"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
});