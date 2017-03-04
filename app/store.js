import { combineReducers, compose, createStore, applyMiddleware } from 'redux'
import { reducer as form } from 'redux-form'
import thunk from 'redux-thunk'

import auth from './modules/auth'

const rootReducer = combineReducers({
  auth,
  form
})

let store
const middleware = [thunk]
if (__DEV__) {
  const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

  const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
    // other store enhancers if any
  )
  store = createStore(rootReducer, enhancer)
} else {
    // Production mode.
  store = createStore(rootReducer, compose(applyMiddleware(...middleware)))
}

export default store
