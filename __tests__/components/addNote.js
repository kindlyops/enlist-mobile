import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'
import moment from 'moment'
import AddNote from '../../app/components/application/addNote'

describe('Initial state', () => {
  test('matches snapshot', () => {
    let users = fromJS([
      {
        id: 1,
        fullName: 'Test User'
      }
    ])

    let addNote = () => {}
    let onStop = () => {}

    const tree = renderer.create(
      <AddNote addNote={addNote} users={users} onStop={onStop} />
    )
    expect(tree.toJSON()).toMatchSnapshot()
  })

  test('adding a note and hitting submit works', () => {
    let users = fromJS([
      {
        id: 1,
        fullName: 'Test User'
      }
    ])

    let addNote = text => {
      expect(text).toEqual('Here is a note')
    }

    let onStop = () => {}

    const component = shallow(
      <AddNote addNote={addNote} users={users} onStop={onStop} />
    )
    expect(component).not.toBeNull()
    expect(component.find('KeyboardView')).toExist()

    component.find('TextInput').props().onChange({
      nativeEvent: {
        text: 'Here is a note',
        contentSize: {}
      }
    })

    component.find('Button').props().onPress()
  })

  test('adding a note with @ brings up the mentions sheet', () => {
    let users = fromJS([
      {
        id: 1,
        fullName: 'Test User',
        email: 'test@example.org'
      }
    ])

    let addNote = text => {
      expect(text).toEqual('Hi @test')
    }

    let onStop = () => {}

    const component = shallow(
      <AddNote addNote={addNote} users={users} onStop={onStop} />
    )
    expect(
      component.findWhere(node => node.prop('testID') === 'add-note-users')
    ).not.toExist()

    component.find('TextInput').props().onChange({
      nativeEvent: {
        text: 'Hi @test',
        contentSize: {}
      }
    })

    expect(
      component.findWhere(node => node.prop('testID') === 'add-note-users')
    ).toExist()
  })
})
