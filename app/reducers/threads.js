import { combineReducers } from 'redux'
import { fromJS, List } from 'immutable'

const initialState = List([])

const list = function(state = initialState, action = {}) {
  switch (action.type) {
    case 'addThreads':
      const ids = state.map(thread => thread.get('id'))

      return state.concat(
        fromJS(action.threads).filterNot(thread => {
          return ids.includes(thread.get('id'))
        })
      )

    default:
      return state
  }
}

const isAddingThread = function(state = false, action = {}) {
  switch (action.type) {
    case 'showNewThreadModal':
      return true

    case 'closeNewThreadModal':
      return false

    default:
      return state
  }
}

export default combineReducers({
  list,
  isAddingThread
})
