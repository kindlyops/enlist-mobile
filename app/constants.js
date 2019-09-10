const NotificationResources = {
  added_note: 'notes',
  received_email: 'emails',
  added_feedback: 'feedbacks',
  completed_questionnaire: 'questionnaires',
  requested_feedback: 'interviews',
  requested_schedule: 'interviews',
  applicant_applied: 'applications',
  added_applicant: 'applications',
  changed_stage: 'stages'
}

const NotificationBlockNames = {
  added_note: 'Mentions in Notes',
  received_email: 'E-mails Received',
  added_feedback: 'Feedback Completed',
  completed_questionnaire: 'Questionnaires Completed',
  requested_feedback: 'Feedback Requested',
  requested_schedule: 'Interviews to Schedule',
  applicant_applied: 'New Applications',
  added_applicant: 'New Leads',
  changed_stage: 'Stage Changes'
}

const AllowedNotifications = [
  'received_email',
  'added_note',
  'added_applicant',
  'applicant_applied'
]

export { NotificationResources, NotificationBlockNames, AllowedNotifications }
