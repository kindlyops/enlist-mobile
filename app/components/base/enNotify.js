import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Image, Text, View, TouchableOpacity } from 'react-native'

import Slide from 'enlist/app/components/animations/slide'
import styles from 'enlist/app/styles'

const closeButton = require('enlist/app/images/close-light.png')

class EnNotify extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { notifications } = this.props

    return (
      <View style={styles.enNotify}>
        {notifications.map(this.renderNotification.bind(this))}
      </View>
    )
  }

  renderNotification(notification) {
    const { dispatch } = this.props
    const type = notification.get('type')

    return (
      <Slide key={notification.get('id')} axis="Y" offset={10}>
        <View key={notification.get('id')} style={styles.enNotifyMessage}>
          <View style={{ flex: 1, padding: 3 }}>
            <Text style={styles.enNotifyText}>
              {notification.get('text')}
            </Text>
          </View>

          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => {
              dispatch({
                type: 'hideNotification',
                notification: {
                  id: notification.get('id')
                }
              })
            }}
          >
            <Image style={{ height: 12, width: 12 }} source={closeButton} />
          </TouchableOpacity>
        </View>
      </Slide>
    )
  }
}

module.exports = connect(state => {
  const { app: { notifications } } = state

  return {
    notifications: notifications
  }
})(EnNotify)
