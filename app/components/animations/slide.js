import React, { Component } from 'react'

import { Animated } from 'react-native'

class Slide extends Component {
  constructor(props) {
    super(props)

    const { offset } = this.props

    this.state = {
      offset: new Animated.Value(offset),
      opacity: new Animated.Value(0)
    }
  }

  componentDidMount() {
    const { friction, duration } = this.props

    Animated.parallel([
      Animated.spring(this.state.offset, {
        useNativeDriver: true,
        duration: duration,
        toValue: 0,
        friction: friction
      }),
      Animated.spring(this.state.opacity, {
        useNativeDriver: true,
        duration: duration,
        toValue: 1,
        friction: friction
      })
    ]).start()
  }

  render() {
    let { opacity, offset } = this.state
    let { axis } = this.props

    let transform = {
      [`translate${axis}`]: offset
    }

    return (
      <Animated.View
        style={[
          {
            backgroundColor: 'transparent',
            opacity: opacity,
            transform: [transform]
          },
          this.props.style
        ]}
      >
        {this.props.children}
      </Animated.View>
    )
  }
}

Slide.defaultProps = {
  axis: 'X',
  offset: 100,
  duration: 50,
  friction: 10
}

module.exports = Slide
