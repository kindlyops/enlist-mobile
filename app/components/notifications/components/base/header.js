import React, { Component } from 'react'

import { Text, View, TouchableOpacity } from 'react-native'

import styles from 'enlist/app/styles'
import { Avatar } from 'enlist/app/base'
import { formatDate } from 'enlist/app/utils'

class NotificationHeader extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { text, notification, onExpand } = this.props
    const actor = notification.get('actor')

    return (
      <TouchableOpacity onPress={onExpand}>
        <View style={{ padding: 10, flexDirection: 'row' }}>
          <Avatar user={actor} size={16} />

          <Text style={[{ flex: 1, fontSize: 13, marginLeft: 10 }]}>
            {actor.get('fullName')}

            <Text style={[styles.lightSmallText]}>
              &nbsp;
              {text}
            </Text>
          </Text>

          <Text style={[{ marginTop: 2, fontSize: 12 }]}>
            {formatDate(notification.get('createdAt'), 'h:mm a', false)}
          </Text>

        </View>
      </TouchableOpacity>
    )
  }
}

module.exports = NotificationHeader
