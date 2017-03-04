import React, { Component, PropTypes } from 'react'
import { Text, View, TouchableOpacity, Button } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import { Container, Input, Item, Spinner } from '../shared'

class Signup extends Component {
  static navigationOptions = {
    title: 'Sign Up'
  }
  static propTypes = {
    actions: PropTypes.shape({
      resetAuthState: PropTypes.func.isRequired,
      registerUser: PropTypes.func.isRequired
    }).isRequired,
    isInitialized: PropTypes.bool.isRequired,
    authError: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    email: PropTypes.string,
    password: PropTypes.string
  }
  componentWillMount () {
    this.props.actions.resetAuthState()
  }
  handleFormSubmit = (props) => {
    const { email, password } = props
    this.props.actions.registerUser({ email, password })
  }
  _renderError = () => {
    return this.props.authError ? <Text > {this.props.authError} </Text> : <View />
  }
  _renderSubmit = () => {
    const { isInitialized, handleSubmit } = this.props
    if (!isInitialized) {
      return <Spinner />
    } else {
      return (
        <Button
          onPress={() => handleSubmit(this.handleFormSubmit(this.props))}
          title='Submit'
          color='#841584'
          accessibilityLabel='Submit sign up form'
        />
      )
    }
  }
  render () {
    return (
      <Container>
        <Item>
          <Field
            name='email'
            component={Input}
            placeholder='Email'
            autoCapitalize={'none'}
          />
        </Item>
        <Item>
          <Field
            name='password'
            component={Input}
            secureTextEntry
            placeholder='Password'
          />
        </Item>
        <Item>
          <Field
            name='repassword'
            component={Input}
            secureTextEntry
            placeholder='Repeat Password'
          />
        </Item>
        <Item>
          {this._renderError()}
        </Item>
        <Item>
          {this._renderSubmit()}
        </Item>
        <Item>
          <TouchableOpacity>
            <Text>
              Already signed up? Click here to login
            </Text>
          </TouchableOpacity>
        </Item>
      </Container>
    )
  }
}

const validate = (props) => {
  const errors = {}
  const fields = ['email', 'password']

  fields.forEach((f) => {
    if (!(f in props)) {
      errors[f] = `${f} is required`
    }
  })

  if (props.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(props.email)) {
    errors.email = 'please provide valid email'
  }

  if (props.password && props.password.length < 6) {
    errors.password = 'minimum 6 characters'
  }

  if (props.password !== props.repassword) {
    errors.repassword = "passwords doesn't match"
  }

  return errors
}

export default reduxForm({ form: 'signup', validate })(Signup)
