import React, { PropTypes } from 'react'
import { Picker } from 'react-native'

const propTypes = {
  input: PropTypes.any.isRequired,
  label: PropTypes.string,
  children: PropTypes.array
}
const SelectInput = ({ input, label, children, ...custom }) => (
  <Picker {...input}
    selectedValue={input.value}
    onValueChange={(value, index) => input.onChange(value)}
    children={children} {...custom} />
)
SelectInput.propTypes = propTypes
export { SelectInput }
