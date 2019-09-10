import { combineReducers } from 'redux'

import app from './app'
import routing from './routing'
import me from './me'
import jobs from './jobs'
import stages from './stages'
import interviews from './interviews'
import feedbacks from './feedbacks'
import applications from './applications'
import applicants from './applicants'
import notes from './notes'
import threads from './threads'
import emails from './emails'
import notifications from './notifications'
import search from './search'

const reducers = combineReducers({
  app,
  routing,
  jobs,
  me,
  stages,
  interviews,
  feedbacks,
  applications,
  applicants,
  notes,
  threads,
  emails,
  notifications,
  search
})

export default function(state, action) {
  if (action.type === 'destroySession') {
    state = undefined
  }

  return reducers(state, action)
}
