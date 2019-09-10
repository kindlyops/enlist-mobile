import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Text, View, TouchableOpacity } from 'react-native'

import styles from 'enlist/app/styles'
import { NotificationHeader, NotificationActions } from './base'

class Application extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isExpanded: false
    }
  }

  toggleExpanded() {
    const { isExpanded } = this.state

    this.setState({
      isExpanded: !isExpanded
    })
  }

  render() {
    let { notification } = this.props
    let { isExpanded } = this.state

    return (
      <View style={isExpanded ? styles.notificationBox : {}}>
        <NotificationHeader
          text={notification.get('text')}
          notification={notification}
          onExpand={this.toggleExpanded.bind(this)}
        />

        {isExpanded ? this.renderApplicationDetails(notification) : null}
      </View>
    )
  }

  renderApplicationDetails(notification) {
    const { dispatch, markRead, goToApplication } = this.props
    const application = notification.get('subject')

    return (
      <NotificationActions
        onRead={markRead}
        onClick={() => goToApplication(application)}
        clickLabel="View Application"
      />
    )
  }
}

module.exports = connect()(Application)
