import { combineReducers } from 'redux'
import { fromJS, List } from 'immutable'

const initialState = List([])

const list = function(state = initialState, action = {}) {
  switch (action.type) {
    case 'addInterviews':
      const ids = state.map(interview => interview.get('id'))

      return state.concat(
        fromJS(action.interviews).filterNot(interview => {
          return ids.includes(interview.get('id'))
        })
      )

    case 'updateInterview':
      const { interview } = action

      return state.update(
        state.findIndex(item => {
          return item.get('id') === interview.id
        }),
        item => {
          return fromJS(interview)
        }
      )

    default:
      return state
  }
}

const isLoading = function(state = false, action = {}) {
  switch (action.type) {
    case 'fetchInterviews':
      return true

    case 'addInterviews':
      return false

    default:
      return state
  }
}

export default combineReducers({
  list,
  isLoading
})
