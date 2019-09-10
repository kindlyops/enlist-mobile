import { isEmpty } from 'lodash'
import { api } from 'enlist/app/utils'
import { fetchApplications } from './applications'

export const fetchInterviews = params => {
  const url = api.url('interviews', params)

  return function(dispatch, getState) {
    const state = getState()
    const { interviews } = state

    if (interviews && interviews.list.size === 0) {
      dispatch({
        type: 'fetchInterviews'
      })
    }

    return api
      .get(url)
      .then(json => {
        const { interviews, feedbacks, questions, answers, documents } = json

        dispatch({
          type: 'addInterviews',
          interviews
        })

        if (isEmpty(interviews)) return

        dispatch(
          fetchApplications({
            ids: interviews.map(interview => interview.applicationId)
          })
        )

        if (isEmpty(feedbacks)) return

        dispatch({
          type: 'addFeedbacks',
          feedbacks,
          questions,
          answers,
          documents
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
