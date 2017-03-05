import * as firebase from 'firebase'

import firebaseConfig from '../firebase.json'
import { createReducer } from './utility'

// ------------------------------------
// Constants
// ------------------------------------

const CREATE_FLIGHT_REQUESTED = 'CREATE_FLIGHT_REQUESTED'
const CREATE_FLIGHT_SUCCESS_RECEIVED = 'CREATE_FLIGHT_SUCCESS_RECEIVED'
const CREATE_FLIGHT_ERROR_RECEIVED = 'CREATE_FLIGHT_ERROR_RECEIVED'

export const ActionTypes = {
  CREATE_FLIGHT_REQUESTED,
  CREATE_FLIGHT_SUCCESS_RECEIVED,
  CREATE_FLIGHT_ERROR_RECEIVED
}

// ------------------------------------
// Actions
// ------------------------------------
const createFlightRequested = () => {
  return {
    type: ActionTypes.CREATE_FLIGHT_REQUESTED
  }
}

const createFlightSuccessReceived = () => {
  return {
    type: ActionTypes.CREATE_FLIGHT_SUCCESS_RECEIVED
  }
}

const createFlightErrorReceived = () => {
  return {
    type: ActionTypes.CREATE_FLIGHT_ERROR_RECEIVED
  }
}

// ------------------------------------
// Action Creators
// ------------------------------------

const createFlight = (newFlight) => async (dispatch, getState) => {
  try {
    const state = getState()
    if (getHasCreated(state) && !getIsCreating(state)) return
    dispatch(createFlightRequested())
    // await firebase.initializeApp(firebaseConfig)
    dispatch(createFlightSuccessReceived())
  } catch (error) {
    dispatch(createFlightErrorReceived())
  }
}

export const Actions = {
  createFlight
}

// ------------------------------------
// Selectors
// ------------------------------------

const getIsCreating = state => state.addFlight.isCreating
const getHasCreated = state => state.addFlight.hasCreated

export const Selectors = {
  getHasCreated,
  getIsCreating
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const handleCreateFlightRequested = (state, action) => {
  return state
}

const handleCreateFlightSuccessReceived = (state, action) => {
  return state
}

const handleCreateFlightErrorReceived = (state, action) => {
  return state
}

export const ActionHandlers = {
  [ActionTypes.CREATE_FLIGHT_REQUESTED]: handleCreateFlightRequested,
  [ActionTypes.CREATE_FLIGHT_SUCCESS_RECEIVED]: handleCreateFlightSuccessReceived,
  [ActionTypes.CREATE_FLIGHT_ERROR_RECEIVED]: handleCreateFlightErrorReceived
}

// ------------------------------------
// Reducer
// ------------------------------------
const INITIAL_STATE = {
  error: '',
  isCreating: false,
  hasCreated: false,
  flight: null
}

export default createReducer(INITIAL_STATE, ActionHandlers)
