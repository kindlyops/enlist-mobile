import React, { Component } from 'react'
import { isEmpty } from 'lodash'
import { Button as MaterialButton } from 'react-native-material-ui'

import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'

import styles from 'enlist/app/styles'

class Button extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let {
      label,
      type,
      isVisible,
      isLoading,
      onPress,
      style,
      textStyle
    } = this.props

    if (isVisible && isVisible === false) {
      return null
    }

    if (isLoading) {
      return this.renderLoading()
    } else if (type === 'accent') {
      return (
        <MaterialButton
          accent
          style={{ container: style, text: textStyle }}
          text={label}
          raised={true}
          onPress={onPress}
          disabled={isLoading}
        />
      )
    } else {
      return (
        <MaterialButton
          primary
          style={{ container: style, text: textStyle }}
          text={label}
          raised={true}
          onPress={onPress}
          disabled={isLoading}
        />
      )
    }
  }

  renderLoading() {
    let { style } = this.props

    return (
      <TouchableOpacity style={[styles.button, style]}>
        <ActivityIndicator color="white" size="small" animating={true} />
      </TouchableOpacity>
    )
  }
}

Button.defaultProps = {
  type: 'primary',
  isVisible: true,
  isLoading: false,
  textStyle: { fontSize: 12 },
  style: {}
}

module.exports = Button
