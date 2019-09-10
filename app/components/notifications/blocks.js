import React, { Component } from 'react'
import { groupBy } from 'lodash'

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'

import { NotificationBlockNames } from 'enlist/app/constants'
import styles from 'enlist/app/styles'

let noNotificationsImage = require('enlist/app/images/no-notifications-light.png')

class NotificationBlocks extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { isLoading, notifications } = this.props

    if (isLoading) {
      return this.renderLoading()
    } else {
      return this.renderNotifications(notifications)
    }
  }

  renderLoading() {
    return (
      <View style={[styles.centered, { padding: 40 }]}>
        <ActivityIndicator animating={true} />
      </View>
    )
  }

  renderNotifications(notifications) {
    const grouped = notifications
      .groupBy(notification => notification.get('actionType'))
      .sort()

    if (notifications && notifications.size > 0) {
      return (
        <View style={styles.box}>
          <Text style={styles.boxHeadlineText}>
            Notifications
          </Text>

          <View style={{ marginTop: 10 }}>
            {grouped.entrySeq().map(([key, grouped]) => {
              return this.renderNotificationBlock(grouped, key)
            })}
          </View>
        </View>
      )
    } else {
      return (
        <View style={[styles.centered, { padding: 40 }]}>
          <Image
            style={{ width: 28, height: 33.5 }}
            source={noNotificationsImage}
          />
          <Text style={{ marginTop: 10, fontWeight: '500', fontSize: 16 }}>
            No notifications.
          </Text>
        </View>
      )
    }
  }

  renderNotificationBlock(notifications, key) {
    let { goToBlock } = this.props
    let label = NotificationBlockNames[key]

    return (
      <TouchableOpacity
        key={key}
        style={styles.notificationBlock}
        onPress={goToBlock.bind(this, key)}
      >

        <View style={styles.notificationBlockCount}>
          <Text style={styles.boldText}>{notifications.size}</Text>
        </View>

        <View style={styles.notificationBlockLabel}>
          <Text>{label}</Text>
        </View>

      </TouchableOpacity>
    )
  }
}

module.exports = NotificationBlocks
