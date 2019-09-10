import { api } from 'enlist/app/utils'
import notify from './notify'

export default function(text, applicationId, isNew = false) {
  const url = api.url('notes')
  const message = isNew ? 'Added note' : 'Replied'

  return function(dispatch, getState) {
    const state = getState()
    const { me } = state

    dispatch({
      type: 'saveNote'
    })

    api
      .post(url, {
        note: {
          text: text,
          applicationId: applicationId,
          createdById: me.get('user').get('id')
        }
      })
      .then(json => {
        dispatch({ type: 'addNote', note: json.note })
        dispatch({ type: 'closeAddNoteModal' })
        dispatch({ type: 'stopReplying' })
        dispatch(notify('success', message))
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: 'addingNoteFailed' })
      })
  }
}
