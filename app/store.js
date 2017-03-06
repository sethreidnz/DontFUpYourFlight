import { AsyncStorage } from 'react-native'
import { combineReducers, compose, createStore, applyMiddleware } from 'redux'
import { reducer as form } from 'redux-form'
import thunk from 'redux-thunk'
import { persistStore, autoRehydrate } from 'redux-persist'

import auth from './modules/auth'
import addFlight from './modules/addFlight'
import allFlights from './modules/allFlights'

const rootReducer = combineReducers({
  auth,
  addFlight,
  allFlights,
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
    autoRehydrate()
  )
  store = createStore(rootReducer, enhancer)
} else {
    // Production mode.
  store = createStore(rootReducer, compose(applyMiddleware(...middleware)))
}

export const rehydrateStore = (callback) => persistStore(store, { storage: AsyncStorage }, () => {
  callback()
})

export default store
