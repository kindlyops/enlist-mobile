import { AsyncStorage } from 'react-native'
import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import { pick, throttle } from 'lodash'

import devTools from 'remote-redux-devtools'
import thunk from 'redux-thunk'
import reducer from 'enlist/app/reducers/index'

export default function configureStore(initialState = {}) {
  const middleware = compose(applyMiddleware(thunk), devTools())

  const store = createStore(reducer, initialState, middleware)

  if (module.hot) {
    module.hot.accept(() => {
      const next = require('enlist/app/reducers/index').default
      store.replaceReducer(next)
    })
  }

  const saveState = state => {
    try {
      const serialized = JSON.stringify(pick(state, ['routing', 'me']))

      AsyncStorage.setItem('state', serialized)
    } catch (err) {
      console.log(err)
    }
  }

  const getAndSaveState = () => {
    let state = store.getState()
    saveState(state)
  }

  store.subscribe(throttle(getAndSaveState, 1000))
  return store
}
