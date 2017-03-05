import * as firebase from 'firebase'

import firebaseConfig from '../firebase.json'
import { createReducer } from './utility'

// ------------------------------------
// Constants
// ------------------------------------

const AIRPORTS_REQUESTED = 'AIRPORTS_REQUESTED'
const AIRPORTS_SUCCESS_RECEIVED = 'AIRPORTS_SUCCESS_RECEIVED'
const AIRPORTS_ERROR_RECEIVED = 'AIRPORTS_ERROR_RECEIVED'

export const ActionTypes = {
  AIRPORTS_REQUESTED,
  AIRPORTS_SUCCESS_RECEIVED,
  AIRPORTS_ERROR_RECEIVED
}

// ------------------------------------
// Actions
// ------------------------------------
const airportsRequested = () => {
  return {
    type: ActionTypes.AIRPORTS_REQUESTED
  }
}

const airportsSuccessReceived = () => {
  return {
    type: ActionTypes.AIRPORTS_SUCCESS_RECEIVED
  }
}

const airportsErrorReceived = () => {
  return {
    type: ActionTypes.AIRPORTS_ERROR_RECEIVED
  }
}

// ------------------------------------
// Action Creators
// ------------------------------------

const requestAirports = () => async (dispatch, getState) => {
  try {
    // 1. check that its not isFetching in the airports part of the sate
    // 2. check that its not hasLoaded
    // 3. Dispatch airportsRequested()
    // 4. Call API
    // 5. Dispatch airportsSuccessReceived(airports)
  } catch (error) {
    // 5. Dispatch airportsErrorReceived(error)
  }
}

export const Actions = {
  requestAirports
}

// ------------------------------------
// Selectors
// ------------------------------------

const hasLoaded = state => state.airports.hasLoaded

export const Selectors = {
  hasLoaded
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const handleAirportsRequested = (state, action) => {
  return state
}

const handleAirportsSuccessReceived = (state, action) => {
  return state
}

const handleAirportsErrorReceived = (state, action) => {
  return state
}

export const ActionHandlers = {
  [ActionTypes.AIRPORTS_REQUESTED]: handleAirportsRequested,
  [ActionTypes.AIRPORTS_SUCCESS_RECEIVED]: handleAirportsSuccessReceived,
  [ActionTypes.AIRPORTS_ERROR_RECEIVED]: handleAirportsErrorReceived
}

// ------------------------------------
// Reducer
// ------------------------------------
const INITIAL_STATE = {
  error: '',
  isFetching: false,
  hasLoaded: false,
  items: false
}

export default createReducer(INITIAL_STATE, ActionHandlers)
