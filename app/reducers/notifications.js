import { combineReducers } from 'redux'

const isLoading = function(state = false, action = {}) {
  switch (action.type) {
    case 'fetchNotifications':
      return true

    case 'updateNotifications':
      return false

    default:
      return state
  }
}

const isReplying = function(state = false, action = {}) {
  switch (action.type) {
    case 'replyTo':
      return true

    case 'stopReplying':
      return false

    default:
      return state
  }
}

const isReplyingTo = function(state = {}, action = {}) {
  switch (action.type) {
    case 'replyTo':
      return { notification: action.notification }

    case 'stopReplying':
      return {}

    default:
      return state
  }
}

export default combineReducers({
  isLoading,
  isReplyingTo,
  isReplying
})
