import { combineReducers } from 'redux'
import { fromJS, List } from 'immutable'

const initialState = List([])

const list = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'addJobs':
      const ids = state.map(job => job.get('id'))

      return state.concat(
        fromJS(action.jobs).filterNot(job => {
          return ids.includes(job.get('id'))
        })
      )

    default:
      return state
  }
}

const isLoading = (state = true, action = {}) => {
  switch (action.type) {
    case 'fetchJobs':
      return true

    case 'addJobs':
      return false

    default:
      return state
  }
}

export default combineReducers({
  list,
  isLoading
})
