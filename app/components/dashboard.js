import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Text, View } from 'react-native'

import moment from 'moment'
import { api } from 'enlist/app/utils'
import { fetchInterviews } from 'enlist/app/actions'

class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this._fetchInterviews()
    this._fetchNotifications()
  }

  _fetchNotifications() {
    let { dispatch, notifications } = this.props

    if (notifications.size === 0) {
      dispatch({
        type: 'fetchNotifications'
      })
    }

    let url = api.url('tracks', {
      includes: 'all'
    })

    api.get(url).then(json => {
      dispatch({
        type: 'updateNotifications',
        notifications: json.tracks
      })
    })
  }

  _fetchInterviews() {
    let { dispatch, user } = this.props

    return dispatch(
      fetchInterviews({
        interviewer_ids: [user.get('id')],
        starts: moment().startOf('day').unix(),
        ends: moment().endOf('day').unix()
      })
    )
  }

  render() {
    let { children } = this.props

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {React.Children.map(children, child => {
            return React.cloneElement(child, {
              ...this.props
            })
          })}
        </View>
      </View>
    )
  }
}

module.exports = connect(state => {
  const { me, interviews, notifications } = state

  return {
    user: me.get('user'),
    users: me.get('details').get('users'),
    notifications: me.get('notifications'),
    notificationsIsLoading: notifications.isLoading,
    interviews: interviews.list,
    interviewsIsLoading: interviews.isLoading
  }
})(Dashboard)
