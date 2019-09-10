import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'
import moment from 'moment'
import {
  AddReplyComponent as AddReply
} from '../../app/components/application/addReply'

describe('Initial state', () => {
  test('matches snapshot', () => {
    let onAdd = () => {}
    let onStop = () => {}

    const tree = renderer.create(<AddReply onAdd={onAdd} onStop={onStop} />)
    expect(tree.toJSON()).toMatchSnapshot()
  })

  test('adding some text and hitting submit works', () => {
    let onAdd = () => {}
    let onStop = () => {}

    const component = shallow(<AddReply onAdd={onAdd} onStop={onStop} />)
    expect(component).not.toBeNull()
    expect(component.find('KeyboardView')).toExist()

    component.find('TextInput').props().onChange({
      nativeEvent: {
        text: 'Here is an email',
        contentSize: {}
      }
    })

    component.find('Button').props().onPress()
  })
})
