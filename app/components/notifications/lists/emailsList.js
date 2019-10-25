import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Text, View } from 'react-native'

import { Email } from '../components'

import { AddReply } from '../../application/addReply'
import { addEmail } from 'enlist/app/actions'
import styles from 'enlist/app/styles'

class EmailsList extends Component {
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
    const email = notification.get('subject')

    if (!email) {
      return null
    }

    const emailId = email.get('id')

    return (
      <Email
        key={emailId}
        notification={notification}
        users={users}
        markRead={() => markRead(notification)}
        toggleReplying={this.toggleReplying.bind(this, notification)}
      />
    )
  }

  renderReply(notification) {
    const { dispatch, users, isSaving } = this.props

    return (
      <AddReply
        isSaving={isSaving}
        onAdd={this.onAddEmail.bind(this)}
        onStop={this.toggleReplying.bind(this)}
      />
    )
  }

  onAddEmail = text => {
    const { dispatch, isReplyingTo: { notification } } = this.props
    const email = notification.get('subject')

    dispatch(
      addEmail({
        text: text,
        subject: email.get('subject'),
        threadId: email.get('threadId'),
        sendToId: email.get('sendFrom').get('id')
      })
    )
  }

  toggleReplying(notification) {
    const { dispatch, isReplying } = this.props

    if (!isReplying) {
      dispatch({ type: 'replyTo', notification: notification })
    } else {
      dispatch({ type: 'stopReplying' })
    }
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
})(EmailsList)
