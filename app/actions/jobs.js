import { api } from 'enlist/app/utils'

export const fetchJobs = () => {
  const url = api.url('jobs')

  return function(dispatch, getState) {
    const state = getState()

    if (state.jobs.size === 0) {
      dispatch({
        type: 'fetchJobs'
      })
    }

    return api
      .get(url)
      .then(json => {
        dispatch({ type: 'addJobs', jobs: json.jobs })
        dispatch({ type: 'addStages', stages: json.stages })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
