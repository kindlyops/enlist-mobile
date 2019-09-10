import React from 'react'
import renderer from 'react-test-renderer'
import { fromJS } from 'immutable'
import moment from 'moment'
import JobBox from '../../app/components/jobs/box'

describe('Initial state', () => {
  test('basics', () => {
    let job = fromJS({
      title: 'Example Job',
      jobType: 'Full-time',
      remote: true,
      status: 'active'
    })

    const tree = renderer.create(<JobBox job={job} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
