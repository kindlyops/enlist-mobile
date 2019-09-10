import { expect } from 'chai'
import { is, fromJS } from 'immutable'
import me from '../app/reducers/me'

describe('Initial state', () => {
  test('should be OK', () => {
    let initialState = me(undefined, {})

    let expectedInitialState = fromJS({
      isAuthenticated: false,
      token: null,
      notifications: [],
      user: {},
      account: {}
    })

    expect(is(initialState, expectedInitialState)).to.be.true
  })
})

describe('Setting session', () => {
  test('should set the session', () => {
    let state = me(undefined, {
      type: 'setSession',
      session: {
        isAuthenticated: true,
        token: 'ABCDEFGHIJKL'
      }
    })

    expect(state.get('token')).to.equal('ABCDEFGHIJKL')
    expect(state.get('isAuthenticated')).to.be.true
  })

  test('should filter and set notifications', () => {
    let state = me(undefined, {
      type: 'setSession',
      session: {
        isAuthenticated: true,
        token: 'ABCDEFGHIJKL',
        notifications: [
          { id: 1, actionType: 'received_email' },
          { id: 2, actionType: 'added_note' },
          { id: 3, actionType: 'added_applicant' },
          { id: 4, actionType: 'applicant_applied' },
          { id: 5, actionType: 'some_other_thing' }
        ]
      }
    })

    expect(state.get('notifications').size).to.equal(4)

    expect(
      state.get('notifications').filter(notification => {
        return notification.get('actionType') === 'some_other_thing'
      }).size
    ).to.equal(0)
  })
})

describe('Setting account', () => {
  test('should set the account details', () => {
    let state = me(undefined, {
      type: 'setAccount',
      account: {
        account: { id: 1 },
        emailTemplates: [],
        forms: []
      }
    })

    expect(state.get('details').get('account').get('id')).to.equal(1)
    expect(state.get('details').get('emailTemplates').size).to.equal(0)
    expect(state.get('details').get('forms').size).to.equal(0)
  })
})

describe('Reading Notifications', () => {
  test('should remove the read notification from the list', () => {
    let state = me(undefined, {
      type: 'setSession',
      session: {
        notifications: [
          { id: 1, actionType: 'added_note' },
          { id: 2, actionType: 'received_email' }
        ]
      }
    })

    let nextState = me(state, {
      type: 'readNotification',
      notificationId: 1
    })

    expect(nextState.get('notifications').size).to.equal(1)
  })
})
