import { combineReducers } from 'redux'

const results = (state = [], action = {}) => {
  switch (action.type) {
    case 'updateResults':
      return action.results

    default:
      return state
  }
}

const isLoading = (state = false, action = {}) => {
  switch (action.type) {
    case 'triggerSearch':
      return true

    case 'updateResults':
      return false

    default:
      return state
  }
}

const hasLoaded = (state = false, action = {}) => {
  switch (action.type) {
    case 'triggerSearch':
      return false

    case 'updateResults':
      return true

    default:
      return state
  }
}

export default combineReducers({
  results,
  isLoading,
  hasLoaded
})
