import { api } from 'enlist/app/utils'

export const newTrack = function(id) {
  return function(dispatch) {
    let url = api.url(`tracks/${id}`)

    return api.get(url).then(response => {
      dispatch({ type: 'addNotification', notification: response.track })
    })
  }
}

export const deletedTrack = function(notificationId) {
  return function(dispatch) {
    dispatch({ type: 'readNotification', notificationId })
  }
}

export const interviewUpdated = function(id) {
  return function(dispatch) {
    let url = api.url(`interviews/${id}`)

    return api.get(url).then(response => {
      dispatch({ type: 'updateInterview', interview: response.interview })
    })
  }
}

const noop = function() {
  return function(dispatch) {
    dispatch({ type: 'noop' })
  }
}

export const create = function({ model, modelId }) {
  if (model === 'Track') {
    return newTrack(modelId)
  } else {
    return noop()
  }
}

export const update = function({ model, modelId }) {
  if (model === 'Interview') {
    return interviewUpdated(modelId)
  } else {
    return noop()
  }
}

export const destroy = function({ model, modelId }) {
  if (model === 'Track') {
    return deletedTrack(modelId)
  } else {
    return noop()
  }
}
