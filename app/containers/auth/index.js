import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SignUpForm from '../../components/auth'
import * as AuthModule from '../../modules/auth'

const mapStateToProps = (state) => {
  const isLoggedIn = AuthModule.Selectors.getIsLoggedIn(state)
  return {
    authError: AuthModule.Selectors.getAuthError(state),
    isInitialized: AuthModule.Selectors.getIsInitialized(state),
    isLoggedIn: isLoggedIn
  }
}

function mapDispatchToProps (dispatch) {
  return { actions: bindActionCreators(AuthModule.Actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)
