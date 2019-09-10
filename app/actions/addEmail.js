import { api } from 'enlist/app/utils'
import notify from './notify'

export default function(email) {
  const url = api.url('emails')

  return function(dispatch, getState) {
    const state = getState()
    const { me } = state

    dispatch({
      type: 'saveEmail'
    })

    api
      .post(url, {
        email: {
          ...email,
          accountId: me.get('details').get('account').get('id'),
          sendFromType: 'User',
          sendToType: 'Application',
          sendFromId: me.get('user').get('id')
        }
      })
      .then(json => {
        dispatch({ type: 'addEmail', email: json.email })
        dispatch({ type: 'closeEmailReplyModal' })
        dispatch({ type: 'stopReplying' })
        dispatch(notify('success', 'Replied'))
      })
      .catch(error => {
        console.log(error)
      })
  }
}
