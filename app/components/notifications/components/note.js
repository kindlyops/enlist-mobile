import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  LayoutAnimation
} from 'react-native'

import styles from 'enlist/app/styles'
import { Avatar } from 'enlist/app/base'
import { formatDate, animations } from 'enlist/app/utils'

import { NotificationHeader, NotificationActions } from './base'

class Note extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isExpanded: false
    }
  }

  toggleExpanded() {
    const { isExpanded } = this.state

    LayoutAnimation.configureNext(animations.layout.spring)
    this.setState({ isExpanded: !isExpanded })
  }

  renderNote(notification) {
    let note = notification.get('subject')
    let linkedText = note.get('linkedText')

    if (!linkedText) {
      return null
    }

    linkedText = linkedText.replace(/<[^>]*>/gi, '')

    return (
      <View style={styles.notificationBoxDetails}>
        <Text style={{ fontSize: 13, lineHeight: 18 }}>
          {linkedText}
        </Text>
      </View>
    )
  }

  renderNoteActions() {
    const { markRead, toggleReplying } = this.props

    return (
      <NotificationActions
        onRead={markRead}
        onClick={toggleReplying}
        clickLabel="Reply"
      />
    )
  }

  render() {
    const { isReplying, text, notification } = this.props
    const { isExpanded } = this.state

    return (
      <View style={isExpanded ? styles.notificationBox : {}}>

        <NotificationHeader
          text="mentioned you"
          onExpand={this.toggleExpanded.bind(this)}
          notification={notification}
        />

        {isExpanded ? this.renderNote(notification) : null}
        {isExpanded ? this.renderNoteActions() : null}
        {isReplying ? this.renderReply(notification) : null}
      </View>
    )
  }
}

module.exports = Note
