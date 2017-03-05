import React, { PropTypes, Component } from 'react'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'

class TimePicker extends Component {
  constructor (props) {
    super(props)
    const date = moment().format('DD MM YYYY, h:mm:ss').toString()
    console.log(date)
    this.state = {
      date: date,
      currentDate: date
    }
  }
  static propTypes = {
    input: PropTypes.any,
    label: PropTypes.any,
    children: PropTypes.any,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.any,
    meta: PropTypes.any,
    minDate: PropTypes.any
  }
  render = () => {
    const { input, label, children, ...custom } = this.props
    return (
      <DatePicker
        date={this.state.date}
        mode='datetime'
        placeholder='select date'
        format='DD MM YYYY, h:mm:ss'
        minDate={this.state.currentDate}
        confirmBtnText='Confirm'
        cancelBtnText='Cancel'
        onDateChange={value => {
          this.state.date = value
          input.onChange(value)
        }}
    />)
  }
}

export { TimePicker }
