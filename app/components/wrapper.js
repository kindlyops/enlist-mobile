import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  reject,
  includes,
  isEmpty,
  filter,
  map,
  head,
  capitalize
} from 'lodash'
import PushNotification from 'react-native-push-notification'

import { Text, View, StatusBar } from 'react-native'

import { activeTree, activeRouteName } from 'enlist/app/utils/routerUtils'
import styles from 'enlist/app/styles'
import routes from 'enlist/app/routes'
import { EnNotify, Tabs } from 'enlist/app/base'

class Wrapper extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    PushNotification.configure({
      popInitialNotification: true,
      requestPermissions: true
    })

    this.updateBadge()
  }

  componentWillReceiveProps() {
    this.updateBadge()
  }

  updateBadge() {
    const { me } = this.props
    const notificationsCount = me.get('notifications').size

    PushNotification.setApplicationIconBadgeNumber(notificationsCount)
  }

  onChangeTab(tab) {
    let { dispatch } = this.props

    dispatch({
      type: 'goTo',
      route: tab
    })
  }

  isActiveRoute(route) {
    let { activeTree } = this.props
    let activeRouteNames = map(activeTree, route => route.name)

    return includes(activeRouteNames, route)
  }

  render() {
    let { activeRoute, activeTree } = this.props

    return (
      <View style={styles.notifications}>
        <StatusBar barStyle="light-content" />

        {this.renderTree(activeTree)}

        <EnNotify />

        <Tabs
          tabs={['dashboard', 'jobs', 'settings']}
          isActiveRoute={this.isActiveRoute.bind(this)}
          onChangeTab={this.onChangeTab.bind(this)}
        />
      </View>
    )
  }

  renderTree(tree) {
    if (isEmpty(tree)) return null

    let { routing: { propsStack } } = this.props

    let node = head(tree)
    let nextTree = reject(tree, branch => branch.name === node.name)
    let nextTreeRendered = this.renderTree(nextTree)

    return React.createElement(
      node.component,
      {
        key: node.name,
        isActiveRoute: this.isActiveRoute.bind(this),
        logout: this.props.logout,
        ...propsStack
      },
      nextTreeRendered
    )
  }
}

module.exports = connect(state => {
  return {
    me: state.me,
    routing: state.routing,
    activeTree: activeTree(routes, activeRouteName(state.routing))
  }
})(Wrapper)
