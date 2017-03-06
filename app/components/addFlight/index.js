import React, { Component, PropTypes } from 'react'
import { View, Picker, Text, Button } from 'react-native'
import { Field, reduxForm } from 'redux-form'

import { TimePicker, SelectInput, Item, Spinner } from '../shared'
import Airports from '../../lib/airports'
import { navigateTo } from '../../modules/utility'

class AddFlight extends Component {
  static navigationOptions = {
    title: 'Add Flight'
  }
  static propTypes = {
    actions: PropTypes.shape({
      createUserFlight: PropTypes.func.isRequired,
      resetAddFlightsState: PropTypes.func.isRequired
    }),
    isCreating:PropTypes.bool,
    hasCreated:PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    departingAirport: PropTypes.string,
    departingDateTime: PropTypes.string,
    destinationAirport: PropTypes.string,
    returningDateTime: PropTypes.string
  }
  _handleFormSubmit = (newFlight) => {
    const { actions: { createUserFlight } } = this.props
    createUserFlight(newFlight)
  }
  componentWillReceiveProps = (nextProps) => {
    const { hasCreated, navigation } = nextProps
    if (hasCreated) {
      navigateTo(navigation, 'MainNavigator')
    }
  }
  componentWillMount = () => {
    const { actions: { resetAddFlightsState } } = this.props
    resetAddFlightsState()
  }
  render = () => {
    const { handleSubmit, isCreating } = this.props
    const PickerItem = Picker.Item
    if (isCreating) return <Spinner />
    return (
      <View>
        <Text>Departing Airport</Text>
        <Field name='departingAirport' mode='dropdown' component={SelectInput} >
          {Airports.map((airport) => <PickerItem label={airport.name} value={airport} key={airport.name} />)}
        </Field>
        <Text>Departing Date/Time</Text>
        <Field name='departingDateTime' component={TimePicker} />
        <Text>Destination Airport</Text>
        <Field name='destinationAirport' mode='dropdown' component={SelectInput} >
          {Airports.map((airport) => <PickerItem label={airport.name} value={airport} key={airport.name} />)}
        </Field>
        <Text>Returning Date/Time</Text>
        <Field name='returningDateTime' component={TimePicker} />
        <Item>
          <Button onPress={handleSubmit(this._handleFormSubmit)} title='Create Flight' />
        </Item>
      </View>
    )
  }
}

// const validate = (props) => {
//   const errors = {}
//   const requiredFields = ['departingDateTime', 'destinationAirport']
//   requiredFields.forEach((f) => {
//     if (!(f in props)) {
//       errors[f] = `${f} is required`
//     }
//   })
//   if (props.departingAirport && props.destinationAirport && props.departingAirport.id === props.destinationAirport.id) {
//     errors.departingAirport = 'Your deparing airport and destination cannot be the same'
//     errors.destinationAirport = 'Your deparing airport and destination cannot be the same'
//   }
//   if (!props.departingDateTime) {
//     errors.departingDateTime = 'You must select a departing date/time'
//   }

//   if (!props.returningDateTime) {
//     errors.returningDateTime = 'You must select a returning date/time'
//   }

//   return errors
// }

export default reduxForm({ form: 'addFlight' })(AddFlight)
