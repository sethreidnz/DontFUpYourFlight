import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import * as AllFlightsModule from '../../modules/allFlights'
import ViewFlights from '../../components/viewFlights'

const mapStateToProps = (state) => {
  return {
    error: AllFlightsModule.Selectors.getError(state),
    isFetching: AllFlightsModule.Selectors.getIsFetching(state),
    hasLoaded: AllFlightsModule.Selectors.getHasLoaded(state),
    isInvalidated: AllFlightsModule.Selectors.getIsInvalidated(state),
    flights: AllFlightsModule.Selectors.getItems(state)
  }
}

function mapDispatchToProps (dispatch) {
  return { actions: bindActionCreators(AllFlightsModule.Actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewFlights)
