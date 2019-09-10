import React, { Component } from 'react'
import { isEmpty } from 'lodash'

import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'

import styles from 'enlist/app/styles'

class Button extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { label, isVisible, isLoading, onPress, style, textStyle } = this.props

    if (isVisible && isVisible === false) return null

    if (isLoading) {
      return (
        <TouchableOpacity style={[styles.button, style]}>
          <ActivityIndicator color="white" size="small" animating={true} />
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
          <Text style={[styles.buttonText, textStyle]}>
            {isEmpty(label) ? this.props.children : label}
          </Text>
        </TouchableOpacity>
      )
    }
  }
}

module.exports = Button
