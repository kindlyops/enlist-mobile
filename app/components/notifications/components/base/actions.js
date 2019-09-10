import React, { Component } from 'react'

import { Text, View, TouchableOpacity } from 'react-native'

import styles from 'enlist/app/styles'

class Actions extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { onRead, onClick, clickLabel } = this.props

    return (
      <View style={styles.notificationBoxActions}>
        <TouchableOpacity onPress={onRead} style={{ flex: 1 }}>
          <Text style={[styles.smallText, styles.lightText, styles.boldText]}>
            Mark as read
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onClick}
          style={{ flex: 1, alignItems: 'flex-end' }}
        >

          <Text style={[styles.smallText, styles.blueText, styles.boldText]}>
            {clickLabel}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

module.exports = Actions
