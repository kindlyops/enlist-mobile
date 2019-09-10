import { fromJS, List } from 'immutable'

const initialState = List([])

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case 'addApplicants':
      const ids = state.map(applicant => applicant.get('id'))

      return state.concat(
        fromJS(action.applicants).filterNot(applicant => {
          return ids.includes(applicant.get('id'))
        })
      )

    default:
      return state
  }
}
