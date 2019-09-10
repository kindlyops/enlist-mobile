import React, { Component } from 'react'

import { Image, View, Text } from 'react-native'

import styles from 'enlist/app/styles'
import Colors from 'enlist/app/styles/colors'

class Avatar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { user, size, style } = this.props
    let fontSize

    if (size >= 16) {
      fontSize = size / 2
    } else {
      fontSize = 8
    }

    if (user.get('avatarUrl')) {
      return (
        <Image
          style={[{ height: size, width: size, borderRadius: size / 2 }, style]}
          source={{ uri: user.get('avatarUrl') }}
        />
      )
    } else {
      return (
        <View
          style={[
            {
              backgroundColor: Colors.gray,
              height: size,
              width: size,
              borderRadius: size / 2
            },
            style,
            styles.centered
          ]}
        >
          <Text
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              fontSize: fontSize,
              fontWeight: '600'
            }}
          >
            {this.userInitials(user)}
          </Text>
        </View>
      )
    }
  }

  userInitials(user) {
    if (user.get('fullName')) {
      return user.get('fullName').charAt(0).toUpperCase()
    } else if (user.get('email')) {
      return user.get('email').charAt(0).toUpperCase()
    } else {
      return ''
    }
  }
}

module.exports = Avatar
