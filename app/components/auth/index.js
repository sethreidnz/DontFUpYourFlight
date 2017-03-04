import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Signup from './SignUp'
import * as AuthModule from '../../modules/auth'

const mapStateToProps = ({ auth }) => {
  const { error, isInitialized, isInitializing, user } = auth
  return { authError: error, isInitialized, isInitializing, user }
}

function mapDispatchToProps (dispatch) {
  return { actions: bindActionCreators(AuthModule.Actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
