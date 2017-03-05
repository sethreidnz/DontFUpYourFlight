import { StackNavigator } from 'react-navigation'

// import the screens for the app
import SplashScreen from './containers/splash'
import AuthScreen from './containers/auth'
import MainNavigator from './containers/main'
import AddFlight from './containers/addFlight'

export default StackNavigator(
  // Navigation route definitions
  {
    SplashScreen: { screen: SplashScreen },
    AuthScreen: { screen: AuthScreen },
    MainNavigator: { screen: MainNavigator },
    AddFlight: { screen: AddFlight }
  },
  // StackNavigatorConfig object
  {
    initialRouteName: 'SplashScreen',
    headerMode: 'float'
  }
)
