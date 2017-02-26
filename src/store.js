import { 
    createStore, 
    applyMiddleware, 
    compose, 
    combineReducers
} from 'redux';

import allFlights from './viewFlights/redux';

const rootReducer = combineReducers({
    allFlights
})

export const store = createStore(
  rootReducer,
  {}
)