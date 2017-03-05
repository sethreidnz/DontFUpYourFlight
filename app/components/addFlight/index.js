import React, { Component, PropTypes } from 'react'
import { View, Picker, Text, Button } from 'react-native'
import { Field, reduxForm } from 'redux-form'

import { TimePicker, SelectInput, Item } from '../shared'
import Airports from '../../api/airports'

class AddFlight extends Component {
  static navigationOptions = {
    title: 'Add Flight'
  }
  static propTypes = {
    actions: PropTypes.shape({

    }),
    handleSubmit: PropTypes.func.isRequired,
    departingAirport: PropTypes.string,
    departingDateTime: PropTypes.string,
    destinationAirport: PropTypes.string,
    returningDateTime: PropTypes.string
  }
  _handleFormSubmit = (newFlight) => {
    // const { actions: { createFlight } } = this.props
    // createFlight(newFlight)
  }
  render = () => {
    const { handleSubmit } = this.props
    const PickerItem = Picker.Item
    return (
      <View>
        <Text>Departing Airport</Text>
        <Field name='departingAirport' mode='dropdown' component={SelectInput} >
          {Airports.map((airport) => <PickerItem label={airport.name} value={airport} key={airport.id} />)}
        </Field>
        <Text>Departing Date/Time</Text>
        <Field name='departingDateTime' mode='dropdown' component={TimePicker} />
        <Text>Destination Airport</Text>
        <Field name='destinationAirport' mode='dropdown' component={SelectInput} >
          {Airports.map((airport) => <PickerItem label={airport.name} value={airport} key={airport.id} />)}
        </Field>
        <Text>Returning Date/Time</Text>
        <Field name='returningDateTime' mode='dropdown' component={TimePicker} />
        <Item>
          <Button onPress={handleSubmit(this._handleFormSubmit)} title='Create Flight' />
        </Item>
      </View>
    )
  }
}

const validate = (props) => {
  const errors = {}
  return errors
}

export default reduxForm({ form: 'addFlight', validate })(AddFlight)
