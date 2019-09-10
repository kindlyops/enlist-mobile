import React, { Component } from 'react'

import { Text, View, TouchableOpacity, LayoutAnimation } from 'react-native'

import { animations } from 'enlist/app/utils'
import Colors from 'enlist/app/styles/colors'

class Panel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isExpanded: false
    }
  }

  toggle = () => {
    const { isExpanded } = this.state

    LayoutAnimation.configureNext(animations.layout.spring)

    this.setState({
      isExpanded: !isExpanded
    })
  }

  render() {
    const { headerText, headerCount, headerExtra, children } = this.props

    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: Colors.mediumGray,
          borderRadius: 4,
          margin: 15,
          marginBottom: 0
        }}
      >
        <TouchableOpacity
          onPress={this.toggle}
          style={{
            flexDirection: 'row',
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            padding: 10
          }}
        >
          {this.renderCount(headerCount)}
          <View
            style={{
              flex: 1,
              justifyContent: 'center'
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: '500',
                color: Colors.textGray
              }}
            >
              {headerText}
            </Text>
          </View>

          {headerExtra ? headerExtra : null}
        </TouchableOpacity>

        {this.renderChildren(children)}
      </View>
    )
  }

  renderCount(count) {
    if (count && count > 0) {
      return (
        <View
          style={{
            backgroundColor: Colors.blue,
            paddingTop: 1.5,
            paddingLeft: 4,
            paddingRight: 4,
            borderRadius: 5,
            marginRight: 5
          }}
        >
          <Text
            style={{
              fontSize: 10,
              fontWeight: '600',
              color: Colors.white
            }}
          >
            {count}
          </Text>
        </View>
      )
    } else {
      return null
    }
  }

  renderChildren(children) {
    const { isExpanded } = this.state

    if (isExpanded) {
      return (
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: Colors.mediumGray
          }}
        >
          {children}
        </View>
      )
    } else {
      return null
    }
  }
}

module.exports = Panel
