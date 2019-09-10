import React, { Component } from 'react'
import { truncate } from 'lodash'

import { Image, Text, View, TouchableOpacity } from 'react-native'

import styles from 'enlist/app/styles'
import { Avatar } from 'enlist/app/base'
import { formatDate } from 'enlist/app/utils'
import Colors from 'enlist/app/styles/colors'

class ThreadBox extends Component {
  constructor(props) {
    super(props)
  }

  sentFrom(lastEmail) {
    let { application, users } = this.props
    let sendFrom = lastEmail.get('sendFrom')
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

  render() {
    let {
      application,
      thread,
      emails,
      users,
      hasUnreadEmails,
      onPress
    } = this.props

    if (!emails || emails.size === 0) {
      return null
    }

    let lastEmail = emails.last()
    let lastEmailFrom = this.sentFrom(lastEmail)
    let textStyle = hasUnreadEmails
      ? styles.boldText
      : styles.inactiveThreadText

    return (
      <TouchableOpacity style={styles.threadBox} onPress={onPress}>

        <View style={styles.threadMetadata}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Avatar
              size={15}
              user={lastEmailFrom}
              style={{ marginTop: 1, marginRight: 5 }}
            />

            {this.renderNewIndicator(hasUnreadEmails)}

            <Text style={textStyle}>
              {lastEmailFrom.fullName}
            </Text>
          </View>

          <View>
            <Text style={styles.lightSmallText}>
              {formatDate(lastEmail.get('createdAt'), 'MMM D, HH:mm')}
            </Text>
          </View>
        </View>

        <View style={styles.threadBoxText}>
          <Text>
            {lastEmail.get('subject')}
          </Text>

          <Text style={[{ marginTop: 5 }, styles.lightSmallText]}>
            {truncate(lastEmail.get('text').replace('\n', ''), { length: 50 })}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderNewIndicator(hasUnreadEmails) {
    if (hasUnreadEmails) {
      return (
        <View
          style={{
            height: 8,
            width: 8,
            borderRadius: 6,
            marginLeft: 3,
            marginRight: 8,
            marginTop: 5,
            backgroundColor: Colors.blue
          }}
        />
      )
    } else {
      return null
    }
  }
}

module.exports = ThreadBox
