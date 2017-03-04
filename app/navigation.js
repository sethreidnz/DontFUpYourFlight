import { StackNavigator } from 'react-navigation'

// import the screens for the app
import SplashScreen from './containers/splash'
import MainNavigator from './containers/main'
import AuthScreen from './containers/auth'

export default StackNavigator(
  // Navigation route definitions
  {
    SplashScreen: { screen: SplashScreen },
    AuthScreen: { screen: AuthScreen },
    MainNavigator: { screen: MainNavigator }
  },
  // StackNavigatorConfig object
  {
    initialRouteName: 'SplashScreen',
    headerMode: 'float'
  }
)
