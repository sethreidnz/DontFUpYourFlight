import { createReducer } from './utility'
import * as firebase from 'firebase'

import * as AuthModule from './auth'

const getFlights = async (userEmail) => {
  const flightsRef = firebase.database().ref('flights')
  const snapshot = await flightsRef.orderByChild('user').equalTo(userEmail).once('value')
  const flightsResponse = snapshot.val()
  const flights = Object.keys(flightsResponse).map((key) => {
    flightsResponse[key].id = key
    return flightsResponse[key]
  })
  return flights
}

// ------------------------------------
// Constants
// ------------------------------------

const ALL_FLIGHTS_REQUESTED = 'ALL_FLIGHTS_REQUESTED'
const ALL_FLIGHTS_SUCCESS_RECEIVED = 'ALL_FLIGHTS_SUCCESS_RECEIVED'
const ALL_FLIGHTS_ERROR_RECEIVED = 'ALL_FLIGHTS_ERROR_RECEIVED'
const INVALIDATE_ALL_FLIGHTS_DATA = 'INVALIDATE_ALL_FLIGHTS_DATA'

export const ActionTypes = {
  ALL_FLIGHTS_REQUESTED,
  ALL_FLIGHTS_SUCCESS_RECEIVED,
  ALL_FLIGHTS_ERROR_RECEIVED,
  INVALIDATE_ALL_FLIGHTS_DATA
}

// ------------------------------------
// Actions
// ------------------------------------
const allFlightsRequested = () => {
  return {
    type: ActionTypes.ALL_FLIGHTS_REQUESTED
  }
}

const allFlightsSuccessReceived = (flights) => {
  return {
    type: ActionTypes.ALL_FLIGHTS_SUCCESS_RECEIVED,
    flights
  }
}

const allFlightsErrorReceived = (error) => {
  return {
    type: ActionTypes.ALL_FLIGHTS_ERROR_RECEIVED,
    error
  }
}

export const invalidateAllFlights = () => {
  return {
    type: ActionTypes.INVALIDATE_ALL_FLIGHTS_DATA
  }
}

// ------------------------------------
// Action Creators
// ------------------------------------

const getUsersFlights = () => async (dispatch, getState) => {
  try {
    const state = getState()
    if (getIsFetching(state)) return
    dispatch(invalidateAllFlights())
    dispatch(allFlightsRequested())
    const user = AuthModule.Selectors.getUser(state)
    const flights = await getFlights(user.email)
    dispatch(allFlightsSuccessReceived(flights))
  } catch (error) {
    dispatch(allFlightsErrorReceived(error))
  }
}

export const Actions = {
  getUsersFlights,
  invalidateAllFlights
}

// ------------------------------------
// Selectors
// ------------------------------------

const getError = state => state.allFlights.error
const getIsFetching = state => state.allFlights.isFetching
const getHasLoaded = state => state.allFlights.hasLoaded
const getIsInvalidated = state => state.allFlights.isInvalidated
const getItems = state => state.allFlights.items

export const Selectors = {
  getError,
  getIsFetching,
  getHasLoaded,
  getIsInvalidated,
  getItems
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const handleAllFlightsRequested = (state, action) => {
  return {
    ...state,
    isFetching: true,
    hasLoaded: false,
    items:[]
  }
}

const handleAllFlightsSuccessReceived = (state, action) => {
  return {
    ...state,
    isFetching: false,
    hasLoaded: true,
    items: action.flights,
    error: null
  }
}

const handleAllFlightsErrorReceived = (state, action) => {
  return {
    ...state,
    isFetching: false,
    hasLoaded: true,
    error: action.error
  }
}

const handleInvalidateAllFlightsData = (state, action) => {
  return {
    ...state,
    INITIAL_STATE,
    isInvalidated: true
  }
}

export const ActionHandlers = {
  [ActionTypes.ALL_FLIGHTS_REQUESTED]: handleAllFlightsRequested,
  [ActionTypes.ALL_FLIGHTS_SUCCESS_RECEIVED]: handleAllFlightsSuccessReceived,
  [ActionTypes.ALL_FLIGHTS_ERROR_RECEIVED]: handleAllFlightsErrorReceived,
  [ActionTypes.INVALIDATE_ALL_FLIGHTS_DATA]: handleInvalidateAllFlightsData
}

// ------------------------------------
// Reducer
// ------------------------------------
const INITIAL_STATE = {
  error: '',
  isFetching: false,
  hasLoaded: false,
  isInvalidated: true,
  items: []
}

export default createReducer(INITIAL_STATE, ActionHandlers)
