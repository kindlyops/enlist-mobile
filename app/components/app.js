import React, { Component } from 'react'
import { View, Text, AsyncStorage, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'

import { keys } from 'lodash'

import Pusher from 'pusher-js/react-native'
import { pusherKey } from 'enlist/app/config'
import { create, update, destroy } from 'enlist/app/actions/pusher'
import PushNotification from 'react-native-push-notification'

import humps from 'humps'
import moment from 'moment'
import timezone from 'moment-timezone'

import { getSession } from 'enlist/app/actions'
import api from 'enlist/app/utils/api'
import Login from 'enlist/app/components/login'
import Wrapper from 'enlist/app/components/wrapper'
import styles from 'enlist/app/styles'
import Slide from 'enlist/app/components/animations/slide'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.checkAuthentication()
  }

  onLogin({ token }) {
    if (!token) {
      console.warn('Did not get any token')
      return
    }

    return this.getCurrentDetails(token)
  }

  /**
   *  Checks for authentication when the component mounts.
   *  We already have all the information we need in the
   *  storage, but we still fetch it again so it's fresh.
   */

  checkAuthentication() {
    AsyncStorage.getItem('session').then(session => {
      if (!session) {
        return this.logout()
      }

      let parsed = JSON.parse(session)
      this.getCurrentDetails(parsed.token, true)
    })
  }

  getCurrentDetails(token, isRefresh = false) {
    let { dispatch } = this.props

    api.setAuthenticationToken(token)

    dispatch(getSession(token, isRefresh))
      .then(session => {
        this.setupPusher(token)
        AsyncStorage.setItem('session', JSON.stringify(session))
      })
      .catch(error => {
        console.error(error)

        if (error && error.status === 401) {
          return this.logout()
        }
      })

    return
  }

  setupPusher(token) {
    const { dispatch, me } = this.props
    const userId = me.get('user').get('id')
    const endpoint = api.url('pusher/auth', null, false)

    this.pusher = new Pusher(pusherKey, {
      authEndpoint: endpoint,

      auth: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    })

    this.channel = this.pusher.subscribe(`private-${userId}`)

    const events = {
      create,
      update,
      destroy
    }

    keys(events).forEach(event => {
      this.channel.bind(event, message => {
        dispatch(events[event](humps.camelizeKeys(message)))
        this.updateBadge()
      })
    })

    return this.pusher
  }

  updateBadge() {
    const { me } = this.props
    const notificationsCount = me.get('notifications').size

    PushNotification.setApplicationIconBadgeNumber(notificationsCount)
  }

  logout() {
    let { dispatch } = this.props

    dispatch({
      type: 'destroySession'
    })

    PushNotification.setApplicationIconBadgeNumber(0)
  }

  render() {
    let { isLoading } = this.props

    if (isLoading) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator animating={true} />
          <Text style={[{ marginTop: 5 }, styles.lightSmallText]}>
            Just a second...
          </Text>
        </View>
      )
    } else {
      return this.renderApp()
    }
  }

  renderApp() {
    let { me } = this.props

    if (me.get('isAuthenticated')) {
      return (
        <Slide axis="Y" offset={20} style={{ flex: 1 }}>
          <Wrapper logout={this.logout.bind(this)} />
        </Slide>
      )
    } else {
      return <Login onLogin={this.onLogin.bind(this)} />
    }
  }
}

module.exports = connect(state => {
  const { me, app } = state

  return {
    me: me,
    isLoading: app.isLoadingSession
  }
})(App)
