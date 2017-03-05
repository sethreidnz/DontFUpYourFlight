import { connect } from 'react-redux'
import Home from '../../components/home'

const mapStateToProps = ({ auth }) => {
  const { error, loading, user } = auth
  return { authError: error, loading, user }
}

export default connect(mapStateToProps, null)(Home)
