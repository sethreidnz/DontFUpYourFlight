import React, { Component, PropTypes } from 'react'
import { View, Picker, Text } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import DatePicker from 'react-native-datepicker'

import { SelectInput } from '../shared'
import Airports from '../../api/airports'

const propTypes = {
  input: PropTypes.any,
  label: PropTypes.any,
  children: PropTypes.any,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.any,
  meta: PropTypes.any,
  minDate: PropTypes.any
}

const renderDatePicker = ({ input, label, children, ...custom }) => (
  <DatePicker
    date='2016-05-15'
    mode='datetime'
    placeholder='select date'
    format='DD-MM-YYYY-HH-MM-SS'
    minDate='2016-05-01'
    maxDate='2016-06-01'
    confirmBtnText='Confirm'
    cancelBtnText='Cancel'
    onDateChange={value => {
      this.date = value
      input.onChange(value)
    }}
  />
)

renderDatePicker.propTypes = propTypes

class AddFlight extends Component {
  static navigationOptions = {
    title: 'Add Flight'
  }
  render = () => {
    const Item = Picker.Item
    return (
      <View>
        <Text>Departing Airport</Text>
        <Field name='departingAirport' mode='dropdown' component={SelectInput} >
          {Airports.map((airport) => <Item label={airport.name} value={airport} key={airport.id} />)}
        </Field>
        <Text>Destination Airport</Text>
        <Field name='destinationAirport' mode='dropdown' component={SelectInput} >
          {Airports.map((airport) => <Item label={airport.name} value={airport} key={airport.id} />)}
        </Field>
        <Text>Date</Text>
        <Field name='departingDate' mode='dropdown' component={renderDatePicker} />
      </View>
    )
  }
}

const validate = (props) => {
  const errors = {}
  return errors
}

export default reduxForm({ form: 'addFlight', validate })(AddFlight)
