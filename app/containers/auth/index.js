import { connect } from 'react-redux'
import Login from '../../components/auth'
import { signInUser, clearState } from '../../modules/auth'

const mapStateToProps = ({ auth }) => {
  const { error, appReady, user } = auth

  return { authError: error, appReady, user }
}

export default connect(mapStateToProps, { signInUser, clearState })(Login)
