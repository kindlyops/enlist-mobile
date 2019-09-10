import { AsyncStorage } from 'react-native'
import { fromJS } from 'immutable'
import { includes } from 'lodash'
import { AllowedNotifications } from 'enlist/app/constants'

let initialState = fromJS({
  isAuthenticated: false,
  token: null,
  notifications: [],
  user: {},
  account: {}
})

function filterNotifications(notifications = []) {
  return notifications.filter(notification => {
    return includes(AllowedNotifications, notification.actionType)
  })
}

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case 'setSession':
      if (!action.session) {
        return state
      }

      return state.merge(
        fromJS({
          ...action.session,
          notifications: (action.session.notifications || [])
            .filter(notification =>
              includes(AllowedNotifications, notification.actionType)
            )
        })
      )

    case 'setAccount':
      let { account } = action
      return state.update('details', () => fromJS(action.account))

    case 'addNotification':
      const { notification } = action

      if (
        notification &&
        !includes(AllowedNotifications, notification.actionType)
      ) {
        return state
      } else {
        return state.update('notifications', () => {
          return state.get('notifications').push(fromJS(notification))
        })
      }

    case 'updateNotifications':
      return state.update('notifications', () => {
        return fromJS(filterNotifications(action.notifications))
      })

    case 'readNotification':
      const { notificationId } = action

      return state.update('notifications', () => {
        return state.get('notifications').filterNot(item => {
          return item.get('id') === notificationId
        })
      })

    case 'destroySession':
      AsyncStorage.multiRemove(['session', 'state'])
      return initialState

    default:
      return state
  }
}
