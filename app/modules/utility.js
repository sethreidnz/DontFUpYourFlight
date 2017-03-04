import { NavigationActions } from 'react-navigation'

export const createReducer = (initialState, handlers) => {
  return function reducer (state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

export const navigateTo = (navigation, routeName, index = 0) => {
  const resetAction = NavigationActions.reset({
    index: index,
    actions: [NavigationActions.navigate({ routeName })]
  })
  navigation.dispatch(resetAction)
}
