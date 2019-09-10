import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Text, View, LayoutAnimation, TouchableOpacity } from 'react-native'

import styles from 'enlist/app/styles'
import { animations } from 'enlist/app/utils'
import ThreadBox from './threadBox'

class ThreadsList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { threads, isAddingThread } = this.props

    return (
      <View>
        {this.renderThreads(threads)}
      </View>
    )
  }

  renderThreads(threads) {
    if (threads && threads.size === 0) {
      return (
        <View style={[styles.blankSlate, { padding: 40 }]}>
          <Text style={[styles.headlineText, { textAlign: 'center' }]}>
            No emails yet.
          </Text>
        </View>
      )
    } else {
      return threads.map(thread => {
        return this.renderThread(thread)
      })
    }
  }

  renderSendEmailBtn() {
    let { dispatch } = this.props

    return (
      <TouchableOpacity
        style={[styles.button, styles.smallButton, { alignSelf: 'flex-end' }]}
        onPress={() => dispatch({ type: 'showNewThreadModal' })}
      >
        <Text style={styles.buttonText}>
          Send an e-mail
        </Text>
      </TouchableOpacity>
    )
  }

  renderThread(thread) {
    let { application, users } = this.props
    let emails = this.emailsForThread(thread)

    return (
      <ThreadBox
        key={thread.get('id')}
        application={application}
        thread={thread}
        hasUnreadEmails={this.hasUnreadEmails(emails)}
        emails={emails}
        users={users}
        onPress={this.goToThread.bind(this, thread)}
      />
    )
  }

  renderAddThread() {
    return null
  }

  goToThread(thread) {
    LayoutAnimation.configureNext(animations.layout.spring)

    return this.props.dispatch({
      type: 'goTo',
      route: 'thread',
      props: {
        thread: thread
      }
    })
  }

  emailsForThread(thread) {
    let { emails } = this.props

    return emails.filter(email => {
      return email.get('threadId') === thread.get('id')
    })
  }

  hasUnreadEmails(emails) {
    let { notifications } = this.props
    let emailIds = emails.map(email => email.get('id'))

    let unread = notifications.filter(notification => {
      return (
        notification.get('actionType') === 'received_email' &&
        emailIds.includes(notification.get('subject').get('id'))
      )
    })

    return unread && unread.length > 0
  }
}

module.exports = connect(state => {
  const { me, emails, threads } = state

  return {
    users: me.get('details').get('users'),
    notifications: me.get('notifications'),
    emails: emails.list,
    isAddingThread: threads.isAddingThread
  }
})(ThreadsList)
