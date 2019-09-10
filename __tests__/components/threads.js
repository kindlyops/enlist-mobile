import React from 'react'
import renderer from 'react-test-renderer'
import { fromJS } from 'immutable'
import moment from 'moment'
import ThreadBox from '../../app/components/application/threadBox'

describe('Initial state', () => {
  test('basics', () => {
    let thread = fromJS({
      id: 1
    })

    let emails = fromJS([
      {
        id: 1,
        threadId: 1,
        subject: 'Test Subject',
        text: 'Test Text',
        createdAt: moment('2019-01-01T12:00:00+00:00'),
        sendFrom: {
          type: 'User',
          id: 1
        }
      }
    ])

    let users = fromJS([
      {
        id: 1,
        fullName: 'User Name'
      }
    ])

    const tree = renderer
      .create(<ThreadBox thread={thread} emails={emails} users={users} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
