import addNote from './actions/addNote'
import addEmail from './actions/addEmail'
import notify from './actions/notify'

import getSession from './actions/getSession'

import {
  fetchApplications,
  changeApplicationStage
} from './actions/applications'
import { fetchJobs } from './actions/jobs'
import { fetchInterviews } from './actions/interviews'
import { findRecord } from './actions/records'
import { search } from './actions/search'

module.exports = {
  addNote,
  addEmail,
  notify,
  fetchApplications,
  changeApplicationStage,
  fetchJobs,
  fetchInterviews,
  findRecord,
  getSession,
  search
}
