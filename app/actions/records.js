import { get } from 'lodash'

export const findRecord = function(record, recordId) {
  return (dispatch, getState) => {
    const state = getState()

    const actualRecord = get(state, record).find(item => {
      return item.get('id') === recordId
    })

    return actualRecord
  }
}
