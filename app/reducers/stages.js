import { fromJS, List } from 'immutable'

const initialState = List([])

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case 'addStages':
      const ids = state.map(stage => stage.get('id'))

      return state.concat(
        fromJS(action.stages).filterNot(stage => {
          return ids.includes(stage.get('id'))
        })
      )

    default:
      return state
  }
}
