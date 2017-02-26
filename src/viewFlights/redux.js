// ------------------------------------
// Constants
// ------------------------------------
export const ALL_FLIGHTS_REQUESTED = 'ALL_FLIGHTS_REQUESTED'
export const ALL_FLIGHTS_RECEIVED = 'ALL_FLIGHTS_RECEIVED'
export const ALL_FLIGHTS_ERROR_RECEIVED = 'ALL_FLIGHTS_ERROR_RECEIVED'

// ------------------------------------
// Actions
// ------------------------------------
const allFlightsRequested = () => {
  return {
    type : ALL_FLIGHTS_REQUESTED
  }
}

const allFlightsReceived = (allFlights) => {
  return {
    type : ALL_FLIGHTS_RECEIVED,
    payload: allFlights
  }
}

const allFlightsErrorReceived = (error) => {
  return {
    type : ALL_FLIGHTS_ERROR_RECEIVED,
    error: error
  }
}

// ------------------------------------
// Action Creators
// ------------------------------------
export const requestAllFlights = ({dispatch}) => {
}

// ------------------------------------
// Action Handlers
// ------------------------------------



// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    items: [
        {
            departingAirportId: 2,
            destinationAirportId: 1,
            departingTime: "2017-03-18T08:35:00+13:00"
        },
        {
            departingAirportId: 1,
            destinationAirportId: 2,
            departingTime: "2017-03-20T18:05:00+13:00"
        }
    ],
    hasLoaded: false,
    isFetching: false,
    hasError: false,
    error: null
}

export default function viewFlightsReducer (state = initialState, action) {
  return state
}

