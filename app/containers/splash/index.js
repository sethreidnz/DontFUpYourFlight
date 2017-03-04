import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { Actions, Selectors } from '../../modules/auth'

const mapStateToProps = (state) => ({
  isAppReady: Selectors.getIsAppReady(state),
  isLoggedIn: Selectors.getIsLoggedIn(state)
})

@connect(mapStateToProps, Actions)
export default class SplashScreen extends Component {
  static propTypes = {
    isAppReady: PropTypes.bool,
    isLoggedIn: PropTypes.bool,
    initializeApp: PropTypes.function,
    navigation: PropTypes.any
  }

  static navigationOptions = {
    header: {
      visible: false
    }
  }

  componentDidMount () {
    this.props.initializeApp()
  }

  componentDidUpdate () {
    debugger
    if (this.props.isAppReady) {
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
      <View style={styles.container} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
