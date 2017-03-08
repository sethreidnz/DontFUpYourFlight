import * as firebase from 'firebase'
import { createSelector } from 'reselect'

import firebaseConfig from '../firebase.json'
import { createReducer } from './utility'
import { invalidateAllFlights } from './allFlights'
import { resetAddFlightsState } from './addFlight'

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
  // logout actions
  LOGOUT_REQUESTED: 'LOGOUT_REQUESTED',
  LOGOUT_SUCCESS_RECIEVED: 'LOGOUT_SUCCESS_RECIEVED',
  LOGOUT_ERROR_RECEIVED: 'LOGOUT_ERROR_RECEIVED',

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

// login actions
const loginRequested = (email, password) => {
  return {
    type: ActionTypes.LOGIN_REQUESTED,
    user: {
      email,
      password
    }
  }
}
const loginSuccessRecieved = (user) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS_RECIEVED,
    user: user
  }
}
const loginErrorRecieved = (error) => {
  return {
    type: ActionTypes.LOGIN_ERROR_RECEIVED,
    error: error
  }
}

// logout actions
const logoutRequested = (email, password) => {
  return {
    type: ActionTypes.LOGOUT_REQUESTED
  }
}
const logoutSuccessRecieved = (user) => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS_RECIEVED
  }
}
const logoutErrorRecieved = (error) => {
  return {
    type: ActionTypes.LOGOUT_ERROR_RECEIVED,
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
    dispatch(invalidateAllFlights())
    dispatch(resetAddFlightsState())
    await firebase.initializeApp(firebaseConfig)
    dispatch(initializeAppSuccessReceived())
  } catch (error) {
    dispatch(initializeAppErrorReceived())
  }
}

const registerUser = (email, password) => async (dispatch) => {
  try {
    dispatch(signUpRequested(email, password))
    const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
    dispatch(signUpSuccessRecieved(user))
  } catch (error) {
    dispatch(signUpErrorRecieved(error))
  }
}

const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequested(email, password))
    const user = await firebase.auth().signInWithEmailAndPassword(email, password)
    dispatch(loginSuccessRecieved(user))
  } catch (error) {
    dispatch(loginErrorRecieved(error))
  }
}

const logoutUser = () => async (dispatch) => {
  try {
    dispatch(logoutRequested())
    await firebase.auth().signOut()
    dispatch(logoutSuccessRecieved())
  } catch (error) {
    dispatch(logoutErrorRecieved(error))
  }
}

export const Actions = {
  initializeApp,
  registerUser,
  loginUser,
  logoutUser,
  resetAuthState
}

// ------------------------------------
// Selectors
// ------------------------------------
const getIsInitialized = state => state.auth.isInitialized
const getIsInitializing = state => state.auth.isInitializing && !state.auth.isInitialized
const getUser = state => state.auth.user
const getIsLoggingIn = state => state.auth.isLoggingIn
const getIsSigningUp = state => state.auth.isSigningUp
const getAuthError = state => state.auth.error ? state.auth.error.message : null

const getIsLoggedIn = createSelector(
  [ getUser ],
  (user) => {
    return user != null
  }
)


const getIsLoading = createSelector(
  [ getIsInitializing, getIsLoggingIn, getIsSigningUp ],
  (isInitializing, isLoggingIn, isSigningUp) => {
    return isInitializing || isLoggingIn || isSigningUp
  }
)

export const Selectors = {
  getIsInitialized,
  getIsInitializing,
  getIsLoggedIn,
  getIsLoggingIn,
  getAuthError,
  getIsLoading,
  getUser
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
  return {
    ...state,
    isSigningUp: true
  }
}

const handleSignUpSuccessReceived = (state, action) => {
  return {
    ...state,
    isSigningUp: false,
    user: action.user
  }
}

const handleSignUpErrorReceived = (state, action) => {
  return {
    ...state,
    isSigningUp: false,
    error: action.error
  }
}

const handleLoginRequested = (state) => {
  return {
    ...state,
    isLoggingIn: true,
    isLoggingOut: false,
    isLoggedIn: false
  }
}

const handleLoginSuccessReceived = (state, action) => {
  return {
    ...state,
    isLoggingIn: false,
    isLoggedIn: true,
    user: action.user
  }
}

const handleLoginErrorReceived = (state, action) => {
  return {
    ...state,
    isLoggingIn: false,
    isLoggedIn: false,
    error: action.error
  }
}

const handleLogoutRequested = (state) => {
  return {
    ...state,
    isLoggingOut: true
  }
}

const handleLogoutSuccessReceived = (state, action) => {
  return {
    ...state,
    isLoggingIn: false,
    isLoggingOut: false,
    user: null
  }
}

const handleLogoutErrorReceived = (state, action) => {
  return {
    ...state,
    isLoggingOut: false,
    error: action.error
  }
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
  [ActionTypes.LOGIN_REQUESTED]: handleLoginRequested,
  [ActionTypes.LOGIN_SUCCESS_RECIEVED]: handleLoginSuccessReceived,
  [ActionTypes.LOGIN_ERROR_RECEIVED]: handleLoginErrorReceived,
  [ActionTypes.LOGOUT_REQUESTED]: handleLogoutRequested,
  [ActionTypes.LOGOUT_SUCCESS_RECIEVED]: handleLogoutSuccessReceived,
  [ActionTypes.LOGOUT_ERROR_RECEIVED]: handleLogoutErrorReceived,
  [ActionTypes.RESET_AUTH_STATE_REQUESTED]: handleResetStateReceived
}

// ------------------------------------
// Reducer
// ------------------------------------
const INITIAL_STATE = {
  error: '',
  isInitialized: false,
  isInitializing: false,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isLoggedIn: false,
  user: null
}

export default createReducer(INITIAL_STATE, ActionHandlers)
