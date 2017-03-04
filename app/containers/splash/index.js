import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyleSheet, View, Text } from 'react-native'
import { NavigationActions } from 'react-navigation'

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
    console.log('Component did mount')
    this.props.actions.initializeApp()
  }

  componentDidUpdate () {
    if (this.props.isInitialized) {
      if (this.props.isLoggedIn) {
        this._navigateTo('MainDrawerNavigator')
      } else {
        this._navigateTo('AuthScreen')
      }
    }
  }

  _navigateTo = (routeName) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
