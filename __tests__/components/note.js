import React from 'react'
import renderer from 'react-test-renderer'
import { fromJS } from 'immutable'
import moment from 'moment'
import Note from '../../app/components/application/note'

describe('Initial state', () => {
  test('basics', () => {
    let note = fromJS({
      id: 1,
      linkedText: 'Here is a note',
      createdAt: moment('2019-01-01T12:00:00+00:00')
    })

    let user = fromJS({
      id: 1,
      fullName: 'Test User'
    })

    const tree = renderer.create(<Note note={note} createdBy={user} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
