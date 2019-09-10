import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  LayoutAnimation
} from 'react-native'

import {
  NotificationBlockNames,
  NotificationResources
} from 'enlist/app/constants'

import styles from 'enlist/app/styles'
import { api, animations, absoluteFormatDate } from 'enlist/app/utils'
import Slide from 'enlist/app/components/animations/slide'

import { ApplicationsList, NotesList, EmailsList } from './notifications/lists'
import Header from './base/header'

let backButton = require('enlist/app/images/back.png')

class Notification extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { isLoading, block, notifications } = this.props
    const label = NotificationBlockNames[block]

    const groupedNotifications = notifications.groupBy(notification => {
      return absoluteFormatDate(notification.get('createdAt'))
    })

    return (
      <View style={styles.notificationComponent}>
        {this.renderHeader(label, notifications.size)}
        {isLoading
          ? this.renderLoading()
          : this.renderNotifications(groupedNotifications)}
      </View>
    )
  }

  renderLoading() {
    return (
      <View style={[{ flex: 1 }, styles.centered]}>
        <ActivityIndicator animating={true} />
      </View>
    )
  }

  renderNotifications(groupedNotifications) {
    if (groupedNotifications && groupedNotifications.size === 0) {
      return (
        <View style={styles.blankSlate}>
          <Text style={{ fontWeight: '500', fontSize: 14 }}>
            No notifications.
          </Text>
        </View>
      )
    } else {
      return (
        <Slide offset={100} style={{ flex: 1 }}>
          <ScrollView
            keyboardShouldPersistTaps={true}
            style={{ padding: 10, paddingBottom: 50 }}
          >
            {this.renderGroups(groupedNotifications)}
          </ScrollView>
        </Slide>
      )
    }
  }

  renderGroups(groups) {
    const { block } = this.props
    const modelName = NotificationResources[block]

    switch (modelName) {
      case 'notes':
        return (
          <NotesList
            notifications={groups}
            markRead={this.markNotificationRead}
          />
        )

      case 'emails':
        return (
          <EmailsList
            notifications={groups}
            markRead={this.markNotificationRead}
          />
        )

      case 'applications':
        return (
          <ApplicationsList
            notifications={groups}
            markRead={this.markNotificationRead}
          />
        )

      default:
        return null
    }
  }

  renderHeader(label, count) {
    const { dispatch } = this.props

    return <Header label={label} onBack={() => dispatch({ type: 'goBack' })} />
  }

  markNotificationRead = notification => {
    const { dispatch } = this.props

    LayoutAnimation.configureNext(animations.layout.spring)

    dispatch({
      type: 'readNotification',
      notificationId: notification.get('id')
    })

    return api
      .post(api.url('tracks/read'), {
        ids: [notification.get('id')]
      })
      .catch(error => {
        console.log(error)
      })
  }
}

module.exports = connect(state => {
  const {
    me,
    notifications: { isLoading },
    routing: { props: { block } }
  } = state

  return {
    block: block,

    notifications: me.get('notifications').filter(notification => {
      return notification.get('actionType') === block
    }),

    isLoading: isLoading
  }
})(Notification)
