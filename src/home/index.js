import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

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
      </View>
    );
  }
}

const styles = StyleSheet.create({
});