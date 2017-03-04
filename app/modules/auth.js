import * as firebase from 'firebase'

import firebaseConfig from '../firebase.json'
import { createReducer } from './utility'

// ------------------------------------
// Constants
// ------------------------------------
export const ActionTypes = {
  // firebase app initialization actions
  INITIALIZE_APP_REQUESTED: 'INITIALIZE_APP_REQUESTED',
  INITIALIZE_APP_SUCCESS_RECEIVED: 'INITIALIZE_APP_SUCCESS_RECEIVED',
  INITIALIZE_APP_ERROR_RECEIVED: 'INITIALIZE_APP_ERROR_RECEIVED',
  // sign up actions
  SIGN_UP_REQUESTED: 'SIGN_UP_REQUESTED',
  SIGN_UP_SUCCESS_RECIEVED: 'SIGN_UP_SUCCESS_RECIEVED',
  SIGN_UP_ERROR_RECEIVED: 'SIGN_UP_ERROR_RECEIVED',
  // login actions
  LOGIN_REQUESTED: 'LOGIN_REQUESTED',
  LOGIN_SUCCESS_RECIEVED: 'LOGIN_SUCCESS_RECIEVED',
  LOGIN_ERROR_RECEIVED: 'LOGIN_ERROR_RECEIVED',

  RESET_AUTH_STATE_REQUESTED: 'RESET_AUTH_STATE_REQUESTED'
}

// ------------------------------------
// Actions
// ------------------------------------

// firebase app initialization actions
const initializeAppRequested = () => {
  return {
    type: ActionTypes.INITIALIZE_APP_REQUESTED
  }
}
const initializeAppSuccessReceived = () => {
  return {
    type: ActionTypes.INITIALIZE_APP_SUCCESS_RECEIVED
  }
}
const initializeAppErrorReceived = () => {
  return {
    type: ActionTypes.INITIALIZE_APP_ERROR_RECEIVED
  }
}

// sign up actions
const signUpRequested = (email, password) => {
  return {
    type: ActionTypes.SIGN_UP_REQUESTED,
    user: {
      email,
      password
    }
  }
}

const signUpSuccessRecieved = (user) => {
  return {
    type: ActionTypes.SIGN_UP_SUCCESS_RECIEVED,
    user: user
  }
}
const signUpErrorRecieved = (error) => {
  return {
    type: ActionTypes.SIGN_UP_ERROR_RECEIVED,
    error: error
  }
}

export const resetAuthState = () => {
  return {
    type: ActionTypes.RESET_AUTH_STATE_REQUESTED
  }
}

// ------------------------------------
// Action Creators
// ------------------------------------

const initializeApp = () => async (dispatch, getState) => {
  try {
    const state = getState()
    if (getIsInitializing(state) && !getIsInitialized(state)) return
    dispatch(initializeAppRequested())
    await firebase.initializeApp(firebaseConfig)
    dispatch(initializeAppSuccessReceived())
  } catch (error) {
    dispatch(initializeAppErrorReceived())
  }
}

const registerUser = ({ email, password }) => async (dispatch) => {
  try {
    dispatch(signUpRequested(email, password))
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    dispatch(signUpSuccessRecieved())
  } catch (error) {
    dispatch(signUpErrorRecieved(error))
  }
}

export const Actions = {
  initializeApp,
  registerUser,
  resetAuthState
}

// ------------------------------------
// Selectors
// ------------------------------------
const getIsInitialized = state => state.auth.isInitialized
const getIsInitializing = state => state.auth.isInitializing && !state.auth.isInitialized
const getIsLoggedIn = state => state.auth.user != null
const getAuthError = state => state.auth.error

export const Selectors = {
  getIsInitialized,
  getIsInitializing,
  getIsLoggedIn,
  getAuthError
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const handleInitializeAppRequested = (state) => {
  return {
    ...state,
    isInitialized: false,
    isInitializing: true
  }
}

const handleInitializeAppSuccessReceived = (state) => {
  return {
    ...state,
    isInitialized: true,
    isInitializing: false
  }
}

const handleInitializeAppErrorReceived = (state, action) => {
  return {
    ...state,
    error: action.error,
    isInitialized: false,
    isInitializing: false
  }
}

const handleSignUpRequested = (state) => {
  return state
}

const handleSignUpSuccessReceived = (state) => {
  return state
}

const handleSignUpErrorReceived = (state) => {
  return state
}

const handleResetStateReceived = (state) => {
  return Object.assign({}, state, {
    user: null,
    error: null
  })
}

export const ActionHandlers = {
  [ActionTypes.INITIALIZE_APP_REQUESTED]: handleInitializeAppRequested,
  [ActionTypes.INITIALIZE_APP_SUCCESS_RECEIVED]: handleInitializeAppSuccessReceived,
  [ActionTypes.INITIALIZE_APP_ERROR_RECEIVED]: handleInitializeAppErrorReceived,
  [ActionTypes.SIGN_UP_REQUESTED]: handleSignUpRequested,
  [ActionTypes.SIGN_UP_SUCCESS_RECIEVED]: handleSignUpSuccessReceived,
  [ActionTypes.SIGN_UP_ERROR_RECEIVED]: handleSignUpErrorReceived,
  [ActionTypes.RESET_AUTH_STATE_REQUESTED]: handleResetStateReceived
}

// ------------------------------------
// Reducer
// ------------------------------------
const INITIAL_STATE = {
  error: '',
  isInitialized: false,
  isInitializing: false,
  user: null
}

export default createReducer(INITIAL_STATE, ActionHandlers)
