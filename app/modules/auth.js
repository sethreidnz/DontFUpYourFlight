// ------------------------------------
// Constants
// ------------------------------------

// sign up actions
export const SIGN_UP_REQUESTED = 'SIGN_UP_REQUESTED'
export const SIGN_UP_SUCCESS_RECIEVED = 'SIGN_UP_SUCCESS_RECIEVED'
export const SIGN_UP_ERROR_RECEIVED = 'SIGN_UP_ERROR_RECEIVED'
//sign in actions
export const SIGN_IN_REQUEST_RECEIVED = 'SIGN_IN_REQUEST_RECEIVED'
export const SIGN_IN_SUCCESS_RECEIVED = 'SIGN_IN_SUCCESS_RECEIVED'
export const SIGN_IN_ERROR_RECEIVED = 'SIGN_IN_ERROR_RECEIVED'
// set initial state 
export const SET_INITIAL_STATE_REQUESTED = 'SET_INITIAL_STATE_REQUESTED'

// ------------------------------------
// Actions
// ------------------------------------
const signUpRequested = (email, password) => {
  return {
    type : SIGN_UP_REQUESTED,
    user: {
        email,
        password
    }
  }
}

const signUpSuccessRecieved = (user) => {
  return {
    type : ALL_FLIGHTS_RECEIVED,
    user: user
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
export const registerUser = ({ email, password }) => async (dispatch) => {
    try {
        dispatch(signUpRequested());
        await firebase.auth()
            .createUserWithEmailAndPassword(email, password);
        console.log("Account created");
        // Navigate to the Home page, the user is auto logged in
    } catch (error) {
        dispatch({ type: SIGN_UP_ERROR_RECEIVED, payload: authFailMessage(error.code) }); 
    }
};

// ------------------------------------
// Action Handlers
// ------------------------------------



// ------------------------------------
// Reducer
// ------------------------------------
const INITIAL_STATE = {
  error: '',
  loading: false,
  user: null,
}

export default function authReducer (state = INITIAL_STATE, action) {
  return state
}

