import { combineReducers } from 'redux'
import { fromJS } from 'immutable'
import moment from 'moment'

let initialState = fromJS([])

const notifications = function(state = initialState, action = {}) {
  switch (action.type) {
    case 'showNotification':
      return state.push(fromJS(action.notification))

    case 'hideNotification':
      return state.filterNot(notification => {
        return notification.get('id') === action.notification.id
      })

    case 'noop':
      return state

    default:
      return state
  }
}

const isLoadingSession = function(state = true, action = {}) {
  switch (action.type) {
    case 'fetchingSession':
      return true

    case 'refreshingSession':
      return false

    case 'fetchedSession':
      return false

    case 'destroySession':
      return false

    default:
      return state
  }
}

export default combineReducers({
  notifications,
  isLoadingSession
})
