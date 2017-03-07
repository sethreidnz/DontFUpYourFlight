import { createReducer } from './utility'

import * as firebase from 'firebase'
import * as AllFlightsModule from './allFlights'

const createFlight = async (flight) => {
  var flightsRef = firebase.database().ref('flights')
  await flightsRef.push(flight)
}

// ------------------------------------
// Constants
// ------------------------------------

const CREATE_FLIGHT_REQUESTED = 'CREATE_FLIGHT_REQUESTED'
const CREATE_FLIGHT_SUCCESS_RECEIVED = 'CREATE_FLIGHT_SUCCESS_RECEIVED'
const CREATE_FLIGHT_ERROR_RECEIVED = 'CREATE_FLIGHT_ERROR_RECEIVED'
const RESET_ADD_FLIGHTS_STATE = 'RESET_ADD_FLIGHTS_STATE'

export const ActionTypes = {
  CREATE_FLIGHT_REQUESTED,
  CREATE_FLIGHT_SUCCESS_RECEIVED,
  CREATE_FLIGHT_ERROR_RECEIVED,
  RESET_ADD_FLIGHTS_STATE
}

// ------------------------------------
// Actions
// ------------------------------------
export const createFlightRequested = (flight) => {
  return {
    type: ActionTypes.CREATE_FLIGHT_REQUESTED,
    flight
  }
}

export const createFlightSuccessReceived = (flight) => {
  return {
    type: ActionTypes.CREATE_FLIGHT_SUCCESS_RECEIVED,
    flight
  }
}

export const createFlightErrorReceived = (error) => {
  return {
    type: ActionTypes.CREATE_FLIGHT_ERROR_RECEIVED,
    error
  }
}

export const resetAddFlightsState = () => {
  return {
    type: ActionTypes.RESET_ADD_FLIGHTS_STATE
  }
}

// ------------------------------------
// Action Creators
// ------------------------------------

const createUserFlight = (flight, user) => async (dispatch, getState) => {
  try {
    const state = getState()
    if (getHasCreated(state) && !getIsCreating(state)) return
    dispatch(createFlightRequested(flight))
    await createFlight(flight)
    dispatch(createFlightSuccessReceived(flight))
    dispatch(AllFlightsModule.invalidateAllFlights())
  } catch (error) {
    console.error(error)
    dispatch(createFlightErrorReceived(error))
  }
}

export const Actions = {
  createUserFlight,
  resetAddFlightsState
}

// ------------------------------------
// Selectors
// ------------------------------------

const getError = state => state.addFlight.error
const getIsCreating = state => state.addFlight.isCreating
const getHasCreated = state => state.addFlight.hasCreated

export const Selectors = {
  getError,
  getHasCreated,
  getIsCreating
}

// ------------------------------------
// Action Handlers
// ------------------------------------

export const handleCreateFlightRequested = (state, action) => {
  return {
    ...state,
    isCreating: true,
    hasCreated: false
  }
}

export const handleCreateFlightSuccessReceived = (state, action) => {
  return {
    ...state,
    isCreating: false,
    hasCreated: true
  }
}

export const handleCreateFlightErrorReceived = (state, action) => {
  return {
    ...state,
    isCreating: false,
    hasCreated: false,
    error: action.error
  }
}

export const handleResetAddFlightState = (state, action) => {
  return {
    ...state,
    ...INITIAL_STATE
  }
}

export const ActionHandlers = {
  [ActionTypes.CREATE_FLIGHT_REQUESTED]: handleCreateFlightRequested,
  [ActionTypes.CREATE_FLIGHT_SUCCESS_RECEIVED]: handleCreateFlightSuccessReceived,
  [ActionTypes.CREATE_FLIGHT_ERROR_RECEIVED]: handleCreateFlightErrorReceived,
  [ActionTypes.RESET_ADD_FLIGHTS_STATE]: handleResetAddFlightState
}

// ------------------------------------
// Reducer
// ------------------------------------
export const INITIAL_STATE = {
  error: '',
  isCreating: false,
  hasCreated: false,
  flight: null
}

export default createReducer(INITIAL_STATE, ActionHandlers)
