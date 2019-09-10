import { api } from 'enlist/app/utils'

export const fetchApplications = params => {
  const url = api.url('applications', { job_id: params.jobId })

  return function(dispatch, getState) {
    const state = getState()

    if (params.jobId) {
      const applications = state.applications.list.filter(application => {
        return application.get('jobId') === params.jobId
      })

      if (applications.size === 0) {
        dispatch({ type: 'fetchApplications' })
      } else {
        dispatch({ type: 'fetchApplicationsInBackground' })
      }
    }

    api
      .get(url)
      .then(json => {
        if (json.applications) {
          dispatch({ type: 'addApplications', applications: json.applications })
        }

        if (json.applicants) {
          dispatch({ type: 'addApplicants', applicants: json.applicants })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const changeApplicationStage = (application, stage) => {
  const id = application.get('id')
  const url = api.url(`applications/${id}`)

  return function(dispatch, getState) {
    dispatch({ type: 'startApplicationUpdate' })

    api
      .put(url, { application: { currentStageId: stage.get('id') } })
      .then(json => {
        dispatch({
          type: 'updateApplication',
          application: json.application
        })

        dispatch({ type: 'completeApplicationUpdate' })
      })
      .catch(error => {
        dispatch({ type: 'completeApplicationUpdate' })
      })
  }
}
