import Dashboard from './components/dashboard'
import Notifications from './components/notifications'
import Notification from './components/notification'
import Jobs from './components/jobs'
import JobsList from './components/jobs/list'
import Job from './components/job'
import Settings from './components/settings'
import Application from './components/application'
import Overview from './components/application/overview'
import Notes from './components/application/notes'
import Threads from './components/application/threads'
import ThreadsList from './components/application/threadslist'
import Thread from './components/application/thread'

export default [
  {
    name: 'dashboard',
    component: Dashboard,
    nested: [
      {
        name: 'notifications',
        component: Notifications,
        isDefault: true
      },
      {
        name: 'notification',
        component: Notification
      }
    ]
  },
  {
    name: 'jobs',
    component: Jobs,
    nested: [
      {
        name: 'jobslist',
        component: JobsList,
        isDefault: true
      },
      {
        name: 'job',
        component: Job
      },
      {
        name: 'application',
        component: Application,
        nested: [
          {
            name: 'overview',
            component: Overview,
            isDefault: true
          },

          {
            name: 'notes',
            component: Notes
          },

          {
            name: 'threads',
            component: Threads,

            nested: [
              {
                name: 'threadslist',
                component: ThreadsList,
                isDefault: true
              },
              {
                name: 'thread',
                component: Thread
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'settings',
    component: Settings
  }
]
