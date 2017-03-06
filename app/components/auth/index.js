import React, { Component, PropTypes } from 'react'
import { Text, View, TouchableOpacity, Button } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import { Container, Input, Item, Spinner } from '../shared'

import { navigateTo } from '../../modules/utility'

class Signup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showLoginScreen: true
    }
  }
  static navigationOptions = {
    title: 'Sign Up'
  }
  static propTypes = {
    actions: PropTypes.shape({
      resetAuthState: PropTypes.func.isRequired,
      registerUser: PropTypes.func.isRequired,
      loginUser: PropTypes.func.isRequired
    }).isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
    isInitialized: PropTypes.bool.isRequired,
    authError: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    email: PropTypes.string,
    password: PropTypes.string
  }
  componentWillReceiveProps = (nextProps) => {
    const { isLoggedIn, navigation } = nextProps
    if (isLoggedIn) {
      navigateTo(navigation, 'MainNavigator')
    }
  }
  componentWillMount () {
    const { isLoggedIn, navigation, actions: { resetAuthState } } = this.props
    if (isLoggedIn) {
      navigateTo(navigation, 'MainNavigator')
    } else {
      // resetAuthState()
    }
  }
  _toggleAuthScreens = () => {
    const { showLoginScreen } = this.state
    this.setState({
      showLoginScreen: !showLoginScreen
    })
  }
  _handleFormSubmit = (feildValues) => {
    const { actions: { registerUser, loginUser } } = this.props
    const { email, password } = feildValues
    const { showLoginScreen } = this.state
    if (!showLoginScreen) {
      registerUser(email, password)
    } else {
      loginUser(email, password)
    }
  }
  _renderError = () => {
    return this.props.authError ? <Text > {this.props.authError} </Text> : <View />
  }
  _renderSubmit = () => {
    const { isInitialized, handleSubmit } = this.props
    const { showLoginScreen } = this.state
    const buttonText = showLoginScreen ? 'Login' : 'Sign up'
    if (!isInitialized) {
      return <Spinner />
    } else {
      return (
        <Item>
          <Button onPress={handleSubmit(this._handleFormSubmit)} title={buttonText} />
        </Item>
      )
    }
  }
  _renderSwitchAuthScreen
  _renderFormElements = () => {
    const { showLoginScreen } = this.state
    return (
      <View>
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
        {
        !showLoginScreen
        ? <Item>
          <Field
            name='repassword'
            component={Input}
            secureTextEntry
            placeholder='Confirm Password'
            />
        </Item>
        : null
        }
      </View>
    )
  }
  render () {
    const { showLoginScreen } = this.state
    const { isLoading } = this.props
    if (isLoading) return <Spinner />
    return (
      <Container>
        { this._renderFormElements() }
        <Item>
          {this._renderError()}
        </Item>
        <Item>
          {this._renderSubmit()}
        </Item>
        <Item>
          <TouchableOpacity onPress={() => this._toggleAuthScreens()}>
            {
            !showLoginScreen
            ? <Text>
                Already signed up? Press here to login
              </Text>
            : <Text>
                Don't have an account? Press here to sign up
              </Text>
            }
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

export default reduxForm({ form: 'auth', validate })(Signup)
