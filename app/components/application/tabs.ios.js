import React, { Component } from 'react'
import { capitalize } from 'lodash'

import { Text, View, Image, TouchableOpacity } from 'react-native'

import styles from 'enlist/app/styles'

let dotsButton = require('enlist/app/images/dots.png')

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
    let activeTextStyle = isActive ? [styles.boldText, styles.blackText] : {}

    let tabName = tab
    if (tab === 'threads') tabName = 'Emails'

    return (
      <TouchableOpacity
        key={tab}
        style={[styles.tabsApplicationItem, activeStyle]}
        onPress={() => onChange(tab)}
      >

        <Text style={[styles.tabsApplicationItemText, ...activeTextStyle]}>
          {capitalize(tabName)}
        </Text>

        {this.renderTabItemsCount(tab)}

      </TouchableOpacity>
    )
  }

  renderTabItemsCount(tab) {
    let count = this.getTabItemsCount(tab)

    if (count && count > 0) {
      return (
        <View style={styles.tabItemsCount}>
          <Text
            style={[styles.lightSmallText, { fontSize: 11, fontWeight: '600' }]}
          >
            {count}
          </Text>
        </View>
      )
    } else {
      return null
    }
  }

  getTabItemsCount(tab) {
    let { application } = this.props

    if (tab === 'notes') {
      return application.get('notesCount')
    } else if (tab === 'threads') {
      return application.get('threadsCount')
    }
  }
}

module.exports = ApplicationTabs
