import React, { Component } from 'react'
import { capitalize } from 'lodash'
import { BottomNavigation } from 'react-native-material-ui'
import { find } from 'lodash'

import { Text, TextInput, View, Image, TouchableOpacity } from 'react-native'

import styles from 'enlist/app/styles'

class Tabs extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { tabs, isActiveRoute } = this.props

    let activeTab = find(tabs, tab => {
      return isActiveRoute(tab)
    })

    return (
      <BottomNavigation active={activeTab}>
        {tabs.map(tab => {
          return this.renderTab(tab)
        })}
      </BottomNavigation>
    )
  }

  renderTab(tab) {
    let { isActiveRoute } = this.props

    let tabIcons = {
      dashboard: 'home',
      jobs: 'list',
      settings: 'settings'
    }

    let tabIcon = tabIcons[tab]

    return (
      <BottomNavigation.Action
        onPress={this.props.onChangeTab.bind(this, tab)}
        key={tab}
        icon={tabIcon}
        label={capitalize(tab)}
      />
    )
  }
}

module.exports = Tabs
