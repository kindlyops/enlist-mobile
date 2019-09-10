import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation
} from 'react-native'

import styles from 'enlist/app/styles'

import { api, formatDate, animations } from 'enlist/app/utils'
import { Avatar } from 'enlist/app/base'
import { addEmail } from 'enlist/app/actions'

import { AddReply } from './addReply'

let downButton = require('enlist/app/images/down.png')

class Thread extends Component {
  constructor(props) {
    super(props)

    this.goBack = this.goBack.bind(this)
  }

  goBack() {
    LayoutAnimation.configureNext(animations.layout.spring)

    return this.props.dispatch({
      type: 'goBack'
    })
  }

  addEmail(text) {
    let { dispatch, thread, emails, application } = this.props

    return dispatch(
      addEmail({
        text: text,
        rawText: text,
        threadId: thread.get('id'),
        sendToId: application.get('id'),
        subject: emails.last().get('subject')
      })
    )
  }

  render() {
    const { dispatch } = this.props

    return (
      <View>
        <View
          style={[
            styles.headerStripe,
            { backgroundColor: 'white', padding: 0 }
          ]}
        >
          <TouchableOpacity
            style={[
              {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'flex-start',
                padding: 10
              }
            ]}
            onPress={this.goBack}
          >

            <Image
              style={{ height: 5, width: 10, marginRight: 8, marginTop: 6 }}
              source={downButton}
            />
            <Text style={styles.blackText}>
              Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{ flex: 1, alignItems: 'flex-end', padding: 10 }]}
            onPress={() => dispatch({ type: 'showEmailReplyModal' })}
          >
            <Text style={styles.blueText}>
              Reply
            </Text>
          </TouchableOpacity>
        </View>

        {this.renderAddReply()}
        {this.renderEmails()}
      </View>
    )
  }

  renderAddReply() {
    let { dispatch, thread, isReplying, isSaving } = this.props

    if (isReplying) {
      return (
        <AddReply
          isSaving={isSaving}
          onAdd={this.addEmail.bind(this)}
          onStop={() => dispatch({ type: 'closeEmailReplyModal' })}
        />
      )
    } else {
      return null
    }
  }

  renderEmails() {
    let { emails } = this.props

    if (emails && emails.size > 0) {
      return (
        <View>
          {emails.reverse().map(email => {
            return this.renderEmail(email)
          })}
        </View>
      )
    } else {
      return (
        <View style={styles.blankSlate}>
          <Text style={[styles.headlineText, { textAlign: 'center' }]}>
            No e-mails yet.
          </Text>
        </View>
      )
    }
  }

  renderEmail(email) {
    let sentFrom = this.sentFrom(email)
    let emailBoxStyle = email.get('sentFromApplication')
      ? [styles.emailBox, styles.emailBoxApplication]
      : styles.emailBox

    return (
      <View key={email.get('id')} style={emailBoxStyle}>

        <View style={styles.emailMetadata}>
          <Avatar
            user={sentFrom}
            size={24}
            style={{ marginRight: 15, marginTop: 2 }}
          />

          <View style={{ flex: 1 }}>
            <Text style={[styles.boldText, { fontSize: 13 }]}>
              {sentFrom.get('fullName')}
            </Text>

            <Text style={[styles.lightSmallText, { fontSize: 12 }]}>
              {sentFrom.get('email')}
            </Text>
          </View>

          <View>
            <Text style={[styles.lightSmallText, { fontSize: 12 }]}>
              {formatDate(email.get('createdAt'), 'MMM D, HH:mm')}
            </Text>
          </View>
        </View>

        <Text style={styles.emailBoxText}>
          {email.get('text')}
        </Text>
      </View>
    )
  }

  sentFrom(email) {
    let { application, users } = this.props

    let sendFrom = email.get('sendFrom')
    let createdBy

    if (sendFrom.get('type') === 'User') {
      createdBy = users.find(user => {
        return user.get('id') === sendFrom.get('id')
      })
    } else {
      createdBy = application
    }

    return createdBy
  }
}

module.exports = connect(state => {
  const { me, routing: { props: { thread } } } = state

  return {
    thread: state.threads.list.find(thread => {
      return thread.get('id') === thread.get('id')
    }),

    emails: state.emails.list.filter(email => {
      return email.get('threadId') === thread.get('id')
    }),

    isReplying: state.emails.isReplying,
    isSaving: state.emails.isSaving,

    currentUser: me.get('user'),
    users: me.get('details').get('users')
  }
})(Thread)
