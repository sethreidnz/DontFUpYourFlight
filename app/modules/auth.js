import * as firebase from 'firebase'

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
  LOGIN_ERROR_RECEIVED: 'LOGIN_ERROR_RECEIVED'
}

// ------------------------------------
// Actions
// ------------------------------------

// firebase app initialization actions
const initializeAppRequested = () => {
  return {
    type : ActionTypes.INITIALIZE_APP_REQUESTED
  }
}
const initializeAppSuccessReceived = () => {
  return {
    type : ActionTypes.INITIALIZE_APP_REQUESTED
  }
}
const initializeAppErrorReceived = () => {
  return {
    type : ActionTypes.INITIALIZE_APP_REQUESTED
  }
}

// sign up actions
const signUpRequested = (email, password) => {
  return {
    type : ActionTypes.SIGN_UP_REQUESTED,
    user: {
      email,
      password
    }
  }
}

const signUpSuccessRecieved = (user) => {
  return {
    type : ActionTypes.SIGN_UP_SUCCESS_RECIEVED,
    user: user
  }
}
const signUpErrorRecieved = (error) => {
  return {
    type : ActionTypes.SIGN_UP_ERROR_RECEIVED,
    error: error
  }
}

// ------------------------------------
// Action Creators
// ------------------------------------

const initializeApp = (firebaseConfig) => async (dispatch) => {
  try {
    dispatch(initializeAppRequested())
    await firebase.initializeApp(firebaseConfig)
    dispatch(initializeAppSuccessReceived())
  } catch (error) {
    dispatch(initializeAppErrorReceived())
  }
}

const registerUser = ({ email, password }) => async (dispatch) => {
  try {
    dispatch(signUpRequested())
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    dispatch(signUpSuccessRecieved())
  } catch (error) {
    dispatch(signUpErrorRecieved())
  }
}

export const Actions = {
  initializeApp,
  registerUser
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const handleInitializeAppRequested = () => {

}

export const ActionHandlers = {
  [ActionTypes.INITIALIZE_APP_REQUESTED]: handleInitializeAppRequested
}


// ------------------------------------
// Selectors
// ------------------------------------
const getIsAppReady = state => state.auth.isAppReady
const getIsLoggedIn = state => state.auth.user != null

export const Selectors = {
  getIsAppReady,
  getIsLoggedIn
}

// ------------------------------------
// Reducer
// ------------------------------------
const INITIAL_STATE = {
  error: '',
  isAppReady: false,
  user: null
}

export default createReducer(INITIAL_STATE, ActionHandlers)
