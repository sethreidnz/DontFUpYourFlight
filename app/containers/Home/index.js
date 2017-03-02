import { connect } from 'react-redux';
import Home from '../../components/home';
import { signInUser, clearState } from '../../modules/auth';

const mapStateToProps = ({ auth }) => {
  const { error, loading, user } = auth;
  return { loading, user };
};

export default connect(mapStateToProps, { signInUser, clearState })(Home);
