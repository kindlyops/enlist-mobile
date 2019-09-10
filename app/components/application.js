import React, { Component } from 'react'
import { capitalize } from 'lodash'
import { connect } from 'react-redux'

import { connectActionSheet } from '@expo/react-native-action-sheet'

import {
  Text,
  Animated,
  View,
  ScrollView,
  Linking,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  LayoutAnimation
} from 'react-native'

import { formatDate, api, animations } from 'enlist/app/utils'
import styles from 'enlist/app/styles'
import routes from 'enlist/app/routes'
import Slide from 'enlist/app/components/animations/slide'
import { Header } from 'enlist/app/base'
import ApplicationTabs from './application/tabs'

let backButton = require('enlist/app/images/back-light.png')

class Application extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let { dispatch } = this.props

    this.fetchApplication()
      .then(json => {
        dispatch({
          type: 'addApplications',
          applications: [json.application]
        })

        dispatch({
          type: 'updateApplication',
          application: json.application
        })
      })
      .catch(error => {
        console.log(error)
      })

    this.fetchResource('tracks')
      .then(json => {
        dispatch({
          type: 'addTracks',
          tracks: json.tracks
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  fetchResource(resource) {
    let { applicationId } = this.props
    let url = api.url(resource, { application_id: applicationId })

    return api.get(url)
  }

  fetchApplication() {
    let { applicationId } = this.props
    let url = api.url(`applications/${applicationId}`)

    return api.get(url)
  }

  goBack() {
    const { dispatch } = this.props

    return dispatch({
      type: 'goBackToPreviousRoute'
    })
  }

  render() {
    let { application, isLoading, children } = this.props

    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        {isLoading
          ? this.renderLoading()
          : this.renderApplication(application, children)}
      </View>
    )
  }

  renderLoading() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator animating={true} />
      </View>
    )
  }

  renderApplication(application, children) {
    return (
      <View style={{ flex: 1 }}>
        <Header
          label={application.get('fullName')}
          onBack={this.goBack.bind(this)}
        />

        <View style={{ flexDirection: 'row' }}>
          <ApplicationTabs
            application={application}
            onChange={this.changeTab}
            onShowSettings={this.showApplicationMenu}
            isActiveRoute={this.props.isActiveRoute}
          />
        </View>

        <Slide offset={100} style={{ flex: 1 }}>
          <ScrollView
            keyboardShouldPersistTaps={true}
            scrollsToTop={false}
            style={{ flex: 1, backgroundColor: 'white' }}
          >
            {React.Children.map(children, child => {
              return React.cloneElement(child, {
                application: application,
                fetchResource: this.fetchResource.bind(this)
              })
            })}
          </ScrollView>
        </Slide>
      </View>
    )
  }

  getApplicationDetails(application) {
    let { isActiveRoute } = this.props

    if (isActiveRoute('thread')) {
      return null
    } else {
      return (
        <View style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row', marginTop: 3, marginBottom: 3 }}>
            <Text style={styles.lightSmallText}>
              {application.get('email')}
            </Text>
            <Text style={{ marginLeft: 5, marginRight: 5 }}>·</Text>
            <Text style={styles.lightSmallText}>
              {application.get('phone')}
            </Text>
          </View>

          <Text style={styles.lightSmallText}>
            Added {formatDate(application.get('createdAt'))}
          </Text>
          {this.renderApplicationTags(application)}
        </View>
      )
    }
  }

  renderApplicationTags(application) {
    const tagNames = application.get('tagNames')

    if (tagNames && tagNames.size > 0) {
      return (
        <ScrollView style={[styles.tags, { marginTop: 10 }]} horizontal={true}>
          {tagNames.map(tag => {
            return (
              <View key={tag} style={styles.tag}>
                <Text style={[styles.lightText, { fontSize: 12 }]}>{tag}</Text>
              </View>
            )
          })}
        </ScrollView>
      )
    } else {
      return null
    }
  }

  changeTab = tab => {
    LayoutAnimation.configureNext(animations.layout.spring)

    return this.props.dispatch({
      type: 'goTo',
      route: tab
    })
  }

  showApplicationMenu = () => {
    const { me, application } = this.props

    let name = application.get('fullName')
    let email = application.get('email')
    let phone = application.get('phone')

    let options = [`Call ${name}`, `Send a message`, `Send an e-mail`, 'Cancel']

    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: 3,
        destructiveButtonIndex: -1
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            Linking.openURL(`tel:${phone}`)
            break

          case 1:
            Linking.openURL(`sms:${phone}`)
            break

          case 2:
            // emails+#{uid}+ap+#{username}
            api
              .post(api.url('threads'), {
                thread: {
                  application_id: application.get('id')
                }
              })
              .then(data => {
                Linking.openURL(
                  `mailto:emails+${data.thread.uid}+ap+${me.get('username')}@hire.enlist.io`
                )
              })

            break

          default:
            return
        }
      }
    )
  }
}

module.exports = connect(state => {
  const { me, routing: { props: { applicationId } } } = state

  return {
    applicationId,

    me: me.get('user'),

    isLoading: state.applications.isLoadingSingle,

    application: state.applications.list.find(application => {
      return applicationId === application.get('id')
    })
  }
})(connectActionSheet(Application))
