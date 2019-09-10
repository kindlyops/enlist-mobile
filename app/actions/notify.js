export default function(type, text, duration = 1500) {
  const id = Math.random().toString(16)

  return dispatch => {
    dispatch({
      type: 'showNotification',
      notification: {
        id,
        type,
        text
      }
    })

    setTimeout(() => {
      dispatch({
        type: 'hideNotification',
        notification: {
          id
        }
      })
    }, duration)
  }
}
