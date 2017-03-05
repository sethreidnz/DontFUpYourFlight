import { connect } from 'react-redux'
import AddFlight from '../../components/addFlight'

const mapStateToProps = ({ auth }) => {
  const { error, loading, user } = auth
  return { authError: error, loading, user }
}

export default connect(mapStateToProps, null)(AddFlight)
