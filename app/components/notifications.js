import React, { Component } from 'react'
import { fromJS } from 'immutable'

import {
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native'

import styles from 'enlist/app/styles'
import { api } from 'enlist/app/utils'
import { findRecord } from 'enlist/app/actions'

import InterviewsToday from './notifications/interviews'
import NotificationBlocks from './notifications/blocks'
import Header from 'enlist/app/components/base/header'

import Search from 'enlist/app/components/search'

let searchImg = require('enlist/app/images/search-light.png')

class Notifications extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isSearching: false
    }
  }

  renderSearch() {
    return (
      <TouchableOpacity
        style={styles.searchBtn}
        onPress={() => {
          this.setState({ isSearching: true })
        }}
      >
        <Image
          style={{ height: 16, width: 16, marginRight: 15 }}
          source={searchImg}
        />
        <Text style={styles.whiteText}>Search...</Text>
      </TouchableOpacity>
    )
  }

  renderSearchOverlay() {
    return <Search onStop={e => this.setState({ isSearching: false })} />
  }

  render() {
    let {
      users,
      notifications,
      interviews,
      interviewsIsLoading,
      notificationsIsLoading
    } = this.props
    let { isSearching } = this.state

    return (
      <View style={{ flex: 1 }}>
        <Header label="Dashboard" />

        <View style={styles.searchBtnContainer}>
          {this.renderSearch()}
        </View>

        {isSearching ? this.renderSearchOverlay() : null}

        <ScrollView style={{ flex: 1 }}>
          <InterviewsToday
            users={users}
            interviews={interviews}
            isLoading={interviewsIsLoading}
            goToApplication={this.goToApplication.bind(this)}
          />

          <NotificationBlocks
            goToBlock={this.goToBlock.bind(this)}
            notifications={notifications}
            isLoading={notificationsIsLoading}
          />
        </ScrollView>
      </View>
    )
  }

  goToBlock(block) {
    return this.props.dispatch({
      type: 'goTo',
      route: 'notification',
      props: {
        block: block
      }
    })
  }

  goToApplication(applicationId) {
    const { dispatch } = this.props
    const url = api.url(`/applications/${applicationId}`)

    dispatch({
      type: 'fetchApplication'
    })

    dispatch({
      type: 'goTo',
      route: 'application',
      previousRoute: 'notifications',
      props: {
        applicationId
      }
    })
  }
}

module.exports = Notifications
