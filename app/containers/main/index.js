import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Home from '../../components/home'
import * as AuthModule from '../../modules/auth'
import * as NotificationModule from '../../modules/notification'

const mapStateToProps = (state) => {
  return {
    authError: AuthModule.Selectors.getAuthError(state),
    isInitialized: AuthModule.Selectors.getIsInitialized(state),
    isLoggedIn: AuthModule.Selectors.getIsLoggedIn(state)
  }
}

function mapDispatchToProps (dispatch) {
  const actionsToMap = {
    ...AuthModule.Actions,
    ...NotificationModule.Actions
  }
  return { actions: bindActionCreators(actionsToMap, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
