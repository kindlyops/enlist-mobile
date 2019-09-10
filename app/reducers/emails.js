import { combineReducers } from 'redux'
import { fromJS, List, Map } from 'immutable'

const initialState = List([])

const list = function(state = initialState, action = {}) {
  switch (action.type) {
    case 'addEmails':
      const ids = state.map(email => email.get('id'))

      return state.concat(
        fromJS(action.emails).filterNot(email => {
          return ids.includes(email.get('id'))
        })
      )

    case 'addEmail':
      return state.push(fromJS(action.email))

    default:
      return state
  }
}

const isSaving = function(state = false, action = {}) {
  switch (action.type) {
    case 'saveEmail':
      return true

    case 'addEmail':
      return false

    default:
      return state
  }
}

const isReplying = function(state = false, action = {}) {
  switch (action.type) {
    case 'showEmailReplyModal':
      return true

    case 'closeEmailReplyModal':
      return false

    default:
      return state
  }
}

export default combineReducers({
  list,
  isSaving,
  isReplying
})
