import React, { Component } from 'react'

import { Provider } from 'react-redux'
import store, { rehydrateStore } from './store'
import Navigation from './navigation'
import { Spinner } from './components/shared'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      storeHydrated: false
    }
  }
  componentWillMount () {
    rehydrateStore(() => {
      this.setState({ storeHydrated: true })
    })
  }
  render () {
    if (!this.state.storeHydrated) return <Spinner />
    return (
      <Provider store={store}>
        <Navigation store={store} />
      </Provider>
    )
  }
}
