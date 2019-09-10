import { combineReducers } from 'redux'
import { fromJS, List } from 'immutable'

const initialState = List([])

const list = function(state = initialState, action = {}) {
  switch (action.type) {
    case 'addNotes':
      const ids = state.map(note => note.get('id'))

      return state.concat(
        fromJS(action.notes).filterNot(note => {
          return ids.includes(note.get('id'))
        })
      )

    case 'addNote':
      return state.push(fromJS(action.note))

    default:
      return state
  }
}

const isSaving = function(state = false, action = {}) {
  switch (action.type) {
    case 'saveNote':
      return true

    case 'addNote':
      return false

    case 'addingNoteFailed':
      return false

    default:
      return state
  }
}

const isLoading = function(state = false, action = {}) {
  switch (action.type) {
    case 'fetchNotes':
      return true

    case 'addNotes':
      return false

    default:
      return state
  }
}

const isAdding = function(state = false, action = {}) {
  switch (action.type) {
    case 'showAddNoteModal':
      return true

    case 'closeAddNoteModal':
      return false

    default:
      return state
  }
}

export default combineReducers({
  isSaving,
  isLoading,
  isAdding,
  list
})
