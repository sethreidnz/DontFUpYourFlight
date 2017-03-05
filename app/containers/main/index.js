import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Home from '../../components/home'
import * as AuthModule from '../../modules/auth'

const mapStateToProps = (state) => {
  return {
    authError: AuthModule.Selectors.getAuthError(state),
    isInitialized: AuthModule.Selectors.getIsInitialized(state),
    isLoggedIn: AuthModule.Selectors.getIsLoggedIn(state)
  }
}

function mapDispatchToProps (dispatch) {
  return { actions: bindActionCreators(AuthModule.Actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
