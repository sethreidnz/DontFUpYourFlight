import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AppState } from 'react-native'

import { Spinner } from '../../components/shared'
import { navigateTo } from '../../modules/utility'
import * as AuthModule from '../../modules/auth'

const mapStateToProps = (state) => ({
  isInitialized: AuthModule.Selectors.getIsInitialized(state),
  isLoggedIn: AuthModule.Selectors.getIsLoggedIn(state)
})

function mapDispatchToProps (dispatch) {
  return { actions: bindActionCreators(AuthModule.Actions, dispatch) }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SplashScreen extends Component {
  static propTypes = {
    isInitialized: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
      initializeApp: PropTypes.func.isRequired
    }).isRequired,
    navigation: PropTypes.any
  }

  static navigationOptions = {
    header: {
      visible: false
    }
  }

  componentDidMount () {
    AppState.addEventListener('change', state =>
      console.log('AppState changed to', state)
    )
    this.props.actions.initializeApp()
  }

  componentDidUpdate () {
    const { isInitialized, isLoggedIn, navigation } = this.props
    if (isInitialized) {
      if (isLoggedIn) {
        navigateTo(navigation, 'MainNavigator')
      } else {
        navigateTo(navigation, 'AuthScreen')
      }
    }
  }

  render () {
    return (
      <Spinner />
    )
  }
}
