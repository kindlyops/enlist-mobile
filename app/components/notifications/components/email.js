import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Text, View, TouchableOpacity } from 'react-native'

import styles from 'enlist/app/styles'
import { NotificationHeader, NotificationActions } from './base'
import { addEmail } from 'enlist/app/actions'

import AddReply from '../../application/addReply'

class Email extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isExpanded: false
    }
  }

  toggleExpanded() {
    const { isExpanded } = this.state

    this.setState({
      isExpanded: !isExpanded
    })
  }

  render() {
    let { notification, isReplying, isSaving } = this.props
    let { isExpanded } = this.state

    return (
      <View style={isExpanded ? styles.notificationBox : {}}>
        <NotificationHeader
          text="sent e-mail"
          notification={notification}
          onExpand={this.toggleExpanded.bind(this)}
        />

        {isExpanded ? this.renderEmail(notification) : null}
        {isExpanded ? this.renderActions(notification) : null}
      </View>
    )
  }

  renderEmail(notification) {
    const email = notification.get('subject')

    return (
      <View style={styles.notificationBoxDetails}>
        <Text>
          {email.get('text')}
        </Text>
      </View>
    )
  }

  renderActions(notification) {
    const { toggleReplying, markRead } = this.props

    return (
      <NotificationActions
        onRead={markRead}
        onClick={toggleReplying}
        clickLabel="Reply"
      />
    )
  }
}

module.exports = Email
