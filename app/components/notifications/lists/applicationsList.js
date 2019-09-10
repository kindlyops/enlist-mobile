import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Text, View } from 'react-native'

import { Application } from '../components'
import styles from 'enlist/app/styles'

class NotesList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      isReplying,
      isReplyingTo: { notification },
      notifications
    } = this.props

    return (
      <View style={{ flex: 1 }}>
        {isReplying ? this.renderReply(notification) : null}
        {notifications.entrySeq().map(this.renderNotificationGroup)}
      </View>
    )
  }

  renderNotificationGroup = ([group, notifications]) => {
    return (
      <View key={group} style={{ padding: 5 }}>
        <Text style={[styles.boxHeadlineText, { fontSize: 12, margin: 10 }]}>
          {group}
        </Text>

        {notifications.map(this.renderNotification)}
      </View>
    )
  }

  renderNotification = notification => {
    const { users, markRead } = this.props
    const note = notification.get('subject')

    if (!note) {
      return null
    }

    const noteId = note.get('id')

    return (
      <Application
        key={noteId}
        notification={notification}
        users={users}
        markRead={() => markRead(notification)}
        goToApplication={this.goToApplication.bind(this)}
      />
    )
  }

  goToApplication(application) {
    const { dispatch } = this.props

    return dispatch({
      type: 'goTo',
      previousRoute: 'notification',
      route: 'application',
      props: {
        application
      }
    })
  }
}

module.exports = connect(state => {
  const {
    me,
    notes: { isSaving },
    notifications: { isReplying, isReplyingTo }
  } = state

  return {
    isSaving,
    isReplying,
    isReplyingTo,
    users: me.get('details').get('users')
  }
})(NotesList)
