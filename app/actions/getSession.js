import moment from 'moment'
import { api } from 'enlist/app/utils'

export default function(token, isRefresh) {
  return function(dispatch, getState) {
    if (isRefresh) {
      dispatch({
        type: 'refreshingSession'
      })
    } else {
      dispatch({
        type: 'fetchingSession'
      })
    }

    return api
      .get(api.url('users/me'))
      .then(json => {
        moment.tz.setDefault(json.user.timezone)

        const session = {
          isAuthenticated: true,
          user: json.user,
          token
        }

        dispatch({
          type: 'setSession',
          session
        })

        return session
      })
      .then(session => {
        api
          .get(api.url(`accounts/${session.user.accountId}`))
          .then(account => {
            dispatch({
              type: 'setAccount',
              account
            })
          })
          .then(() => {
            dispatch({
              type: 'fetchedSession'
            })
          })

        return session
      })
  }
}
