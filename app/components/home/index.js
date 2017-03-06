import React, { Component, PropTypes } from 'react'
import { navigateTo } from '../../modules/utility'

import HomeActionButtons from './components/HomeActionButtons'

export default class HomeScreen extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      logoutUser: PropTypes.func.isRequired,
      createNotification: PropTypes.func.isRequired,
      resetNotificationState: PropTypes.func.isRequired
    }),
    navigation: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
  }
  static navigationOptions = {
    title: 'Dont F Up Your Flight'
  }
  componentWillReceiveProps = (nextProps) => {
    const { isLoggedIn, navigation } = nextProps
    if (!isLoggedIn) {
      navigateTo(navigation, 'AuthScreen')
    }
  }
  render () {
    const { navigation, actions: { logoutUser, createNotification } } = this.props
    return <HomeActionButtons navigation={navigation} logout={logoutUser} createNotification={createNotification} />
  }
}
