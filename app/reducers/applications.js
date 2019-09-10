import { combineReducers } from 'redux'
import { fromJS, List } from 'immutable'

const initialState = List([])

const list = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'addApplications':
      const ids = state.map(application => application.get('id'))

      return state.concat(
        fromJS(action.applications).filterNot(application => {
          return ids.includes(application.get('id'))
        })
      )

    case 'updateApplication':
      const { application } = action

      return state.update(
        state.findIndex(item => {
          return item.get('id') === application.id
        }),
        item => {
          return fromJS(application)
        }
      )

    default:
      return state
  }
}

const isLoadingSingle = (state = true, action = {}) => {
  switch (action.type) {
    case 'fetchApplication':
      return true

    case 'addApplications':
      return false

    default:
      return state
  }
}

const isLoading = (state = true, action = {}) => {
  switch (action.type) {
    case 'fetchApplications':
      return true

    case 'addApplications':
      return false

    default:
      return state
  }
}

const isLoadingInBackground = (state = false, action = {}) => {
  switch (action.type) {
    case 'fetchApplicationsInBackground':
      return true

    case 'addApplications':
      return false

    default:
      return state
  }
}

const isUpdating = (state = false, action = {}) => {
  switch (action.type) {
    case 'startApplicationUpdate':
      return true

    case 'completeApplicationUpdate':
      return false

    default:
      return state
  }
}

export default combineReducers({
  list,
  isLoading,
  isLoadingSingle,
  isLoadingInBackground,
  isUpdating
})
