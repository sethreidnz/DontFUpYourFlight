import React, { PropTypes } from 'react'
import { Picker } from 'react-native'

const propTypes = {
  input: PropTypes.any.isRequired,
  label: PropTypes.any.isRequired,
  children: PropTypes.any
}
const CalenderPickerInput = ({ input, label, children, ...custom }) => (
  <Picker {...input}
    selectedValue={input.value}
    onValueChange={(value, index) => input.onChange(value)}
    children={children} {...custom} />
)
CalenderPickerInput.propTypes = propTypes
export { CalenderPickerInput }
