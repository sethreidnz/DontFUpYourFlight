import React, { Component, PropTypes } from 'react'
import { View, Picker, Text, Button } from 'react-native'
import { Field, reduxForm } from 'redux-form'

import Styles from '../../styles'
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
    isLoading:PropTypes.bool,
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
    const { handleSubmit, isLoading, hasCreated } = this.props
    const PickerItem = Picker.Item
    if (isLoading || hasCreated) return <Spinner />
    return (
      <View style={Styles.container}>
        <Text style={Styles.label}>Departing Airport</Text>
        <Field name='departingAirport' mode='dropdown' component={SelectInput} >
          {Airports.map((airport) => <PickerItem label={airport.name} value={airport} key={airport.name} />)}
        </Field>
        <Text style={Styles.label}>Departing Date/Time</Text>
        <Field name='departingDateTime' component={TimePicker} />
        <Text style={Styles.label}>Destination Airport</Text>
        <Field name='destinationAirport' mode='dropdown' component={SelectInput} >
          {Airports.map((airport) => <PickerItem label={airport.name} value={airport} key={airport.name} />)}
        </Field>
        <Text style={Styles.label}>Returning Date/Time</Text>
        <Field name='returningDateTime' component={TimePicker} />
        <Item>
          <Button style={Styles.button} onPress={handleSubmit(this._handleFormSubmit)} title='Create Flight' />
        </Item>
      </View>
    )
  }
}

const validate = (props) => {

}

export default reduxForm({ form: 'addFlight' })(AddFlight)
