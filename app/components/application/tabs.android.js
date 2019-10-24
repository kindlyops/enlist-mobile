import React, { Component } from 'react'
import { capitalize } from 'lodash'

import { Text, View, Image, TouchableOpacity } from 'react-native'

import styles from 'enlist/app/styles'
import { Badge } from 'react-native-material-ui'

let dotsButton = require('enlist/app/images/dots-light.png')

class ApplicationTabs extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return this.renderTabs()
  }

  renderTabs() {
    const tabs = ['overview', 'notes', 'threads']

    return (
      <View style={styles.tabsApplication}>
        {tabs.map(tab => {
          return this.renderTab(tab)
        })}
        {this.renderSettings()}
      </View>
    )
  }

  renderSettings() {
    return (
      <TouchableOpacity
        style={styles.tabApplicationSettings}
        onPress={() => this.props.onShowSettings()}
      >
        <Image
          style={{ width: 16.5, height: 3, marginTop: 8 }}
          source={dotsButton}
        />
      </TouchableOpacity>
    )
  }

  renderTab(tab) {
    let { onChange, isActiveRoute } = this.props
    let isActive = isActiveRoute(tab)

    let activeStyle = isActive ? styles.tabsApplicationItemActive : {}
    let activeTextStyle = isActive ? [styles.boldText, styles.whiteText] : []

    return (
      <TouchableOpacity
        key={tab}
        style={[styles.tabsApplicationItem, activeStyle]}
        onPress={() => onChange(tab)}
      >
        {this.renderTabText(tab, activeTextStyle)}
      </TouchableOpacity>
    )
  }

  renderTabText(tab, activeTextStyle) {
    const count = this.getTabItemsCount(tab)

    let tabName = tab
    if (tab === 'threads') tabName = 'Emails'

    if (count && count > 0) {
      return (
        <Badge
          text={count.toString()}
          size={20}
          style={{ container: { bottom: 10, right: -15 } }}
        >
          <Text style={[styles.tabsApplicationItemText, ...activeTextStyle]}>
            {capitalize(tabName)}
          </Text>
        </Badge>
      )
    } else {
      return (
        <Text style={[styles.tabsApplicationItemText, ...activeTextStyle]}>
          {capitalize(tabName)}
        </Text>
      )
    }
  }

  getTabItemsCount(tab) {
    let { application } = this.props

    if (tab === 'notes') {
      return application.get('notesCount')
    } else if (tab === 'threads') {
      return application.get('threadsCount')
    }

    return 0
  }
}

module.exports = ApplicationTabs
