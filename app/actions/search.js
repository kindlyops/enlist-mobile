import { api } from 'enlist/app/utils'

export const search = term => {
  const url = api.url(`search?term=${term}`)

  return function(dispatch, getState) {
    dispatch({
      type: 'triggerSearch'
    })

    return api
      .get(url)
      .then(json => {
        dispatch({
          type: 'updateResults',
          results: json.applications
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
