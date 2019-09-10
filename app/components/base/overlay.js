import React, { Component } from 'react'
import { keys } from 'lodash'

import { Text, View, ScrollView, Animated } from 'react-native'

import styles from 'enlist/app/styles'

class Overlay extends Component {
  constructor(props) {
    super(props)

    this.state = {
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(150)
    }
  }

  componentDidMount() {
    Animated.timing(this.state.opacity, { toValue: 1, duration: 200 }).start()

    Animated.timing(this.state.translateY, {
      toValue: 0,
      duration: 200
    }).start()
  }

  render() {
    return (
      <Animated.View
        style={[styles.fadeScreen, { opacity: this.state.opacity }]}
      >
        <Animated.View
          style={[
            styles.modal,
            { transform: [{ translateY: this.state.translateY }], flex: 1 }
          ]}
        >
          {this.props.children}
        </Animated.View>
      </Animated.View>
    )
  }
}

module.exports = Overlay
