import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AddFlight from '../../components/addFlight'
import * as AddFlightsModule from '../../modules/addFlight'

const mapStateToProps = (state) => {
  return {
    error: AddFlightsModule.Selectors.getError(state),
    isCreating: AddFlightsModule.Selectors.getIsCreating(state),
    hasCreated: AddFlightsModule.Selectors.getHasCreated(state)
  }
}

function mapDispatchToProps (dispatch) {
  return { actions: bindActionCreators(AddFlightsModule.Actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFlight)
