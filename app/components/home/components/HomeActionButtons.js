import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class HomeActionButtons extends React.Component {
  constructor({props}){
    super(props);
  }
  static navigationOptions = {
    title: 'Dont F Up Your Flight',
  };
  render() {
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