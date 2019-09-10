import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Text, View } from 'react-native'

import { Note } from '../components'

import AddNote from '../../application/addNote'
import { addNote } from 'enlist/app/actions'
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
      <Note
        key={noteId}
        notification={notification}
        users={users}
        markRead={() => markRead(notification)}
        toggleReplying={this.toggleReplying.bind(this, notification)}
      />
    )
  }

  renderReply(notification) {
    const { users, isSaving } = this.props
    const actorUsername = notification.get('actor').get('username')

    let text

    if (actorUsername) {
      text = `@${actorUsername}`
    } else {
      text = ``
    }

    return (
      <AddNote
        isSavingNote={isSaving}
        text={text}
        users={users}
        addNote={this.onAddNote}
        onStop={this.toggleReplying.bind(this)}
      />
    )
  }

  onAddNote = text => {
    const { dispatch, isReplyingTo: { notification } } = this.props
    return dispatch(addNote(text, notification.get('applicationId')))
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
})(NotesList)
