import React, { Component } from 'react'

import { Provider } from 'react-redux'
import store from './store'
import Navigation from './navigation'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = { loaded: false }
  }
  componentWillMount () {
  }
  render () {
    return (
      <Provider store={store}>
        <Navigation store={store} />
      </Provider>
    )
  }
}
