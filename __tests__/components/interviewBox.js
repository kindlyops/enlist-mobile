import React from 'react'
import renderer from 'react-test-renderer'
import { fromJS } from 'immutable'
import moment from 'moment'
import InterviewBox from '../../app/components/base/interviewBox'

describe('Initial state', () => {
  test('basics', () => {
    let interview = fromJS({
      duration: 60,
      scheduledFor: moment('2019-01-01T12:00:00+00:00'),
      applicationName: 'Test Application',
      medium: 'Phone'
    })

    const tree = renderer
      .create(<InterviewBox interview={interview} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
