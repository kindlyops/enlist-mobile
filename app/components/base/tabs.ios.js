import React, { Component } from 'react'
import { capitalize } from 'lodash'

import { Text, TextInput, View, Image, TouchableOpacity } from 'react-native'

import styles from 'enlist/app/styles'

class Tabs extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { tabs } = this.props

    return (
      <View style={styles.tabs}>
        {tabs.map(tab => {
          return this.renderTab(tab)
        })}
      </View>
    )
  }

  renderTab(tab) {
    let { isActiveRoute } = this.props

    let tabIconsInactive = {
      dashboard: require('enlist/app/images/notifications-inactive.png'),
      jobs: require('enlist/app/images/jobs-inactive.png'),
      settings: require('enlist/app/images/settings-inactive.png')
    }

    let tabIconsActive = {
      dashboard: require('enlist/app/images/notifications.png'),
      jobs: require('enlist/app/images/jobs.png'),
      settings: require('enlist/app/images/settings.png')
    }

    let tabIcon = isActiveRoute(tab)
      ? tabIconsActive[tab]
      : tabIconsInactive[tab]
    let tabText = isActiveRoute(tab)
      ? styles.tabItemTextActive
      : styles.tabItemText
    let tabItem = isActiveRoute(tab)
      ? [styles.tabItem, styles.tabItemActive]
      : [styles.tabItem]

    return (
      <TouchableOpacity
        onPress={this.props.onChangeTab.bind(this, tab)}
        key={tab}
        style={tabItem}
      >
        <Image style={styles.tabItemIcon} source={tabIcon} />
        <Text style={tabText}>{capitalize(tab)}</Text>
      </TouchableOpacity>
    )
  }
}

module.exports = Tabs
