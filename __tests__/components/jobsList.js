import React from 'react'
import renderer from 'react-test-renderer'
import { fromJS } from 'immutable'
import moment from 'moment'
import JobsList from '../../app/components/jobs/list'

describe('Initial state', () => {
  test('basics', () => {
    let jobs = fromJS([
      {
        id: '1',
        title: 'Example Job',
        jobType: 'Full-time',
        remote: true,
        status: 'active',
        category: 'Engineering'
      },
      {
        id: '2',
        title: 'Another Job',
        jobType: 'Full-time',
        city: 'London',
        status: 'active',
        category: 'Design'
      }
    ])

    const tree = renderer.create(<JobsList jobs={jobs} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
