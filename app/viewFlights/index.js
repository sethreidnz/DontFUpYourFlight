// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';


function mapStateToProps(state) {
  return { flights: state.allFlights.items };
}

function mapDispatchToProps(dispatch) {
  return { actions: null };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ViewFlightsScreen extends React.Component {
  constructor({props}){
    super(props);
  }
  static navigationOptions = {
    title: 'Flights at risk',
  };
  render() {
    return <Text>{this.props.flights[0].departingTime }</Text>;
  }
}

const styles = StyleSheet.create({
});