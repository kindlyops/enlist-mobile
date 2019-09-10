import React, { Component } from 'react'
import { capitalize } from 'lodash'
import moment from 'moment'
import timezone from 'moment-timezone'

import {
  Text,
  Image,
  View,
  TouchableOpacity,
  LayoutAnimation,
  Linking
} from 'react-native'

import { animations } from 'enlist/app/utils'
import styles from 'enlist/app/styles'
import Avatar from './avatar'

import { connectActionSheet } from '@expo/react-native-action-sheet'

let dotsButton = require('enlist/app/images/dots.png')

class InterviewBox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isExpanded: false
    }
  }

  toggleExpanded() {
    LayoutAnimation.configureNext(animations.layout.spring)

    return this.setState({
      isExpanded: !this.state.isExpanded
    })
  }

  render() {
    const { interview, interviewers } = this.props
    return this.renderInterview(interview, interviewers)
  }

  renderInterview(interview, interviewers) {
    let { isExpanded } = this.state

    let isPast = this.isPastInterview(interview)
    let isInNext30Minutes = this.isInNext30Minutes(interview)

    let expandedStyle = isExpanded ? styles.interviewExpanded : {}

    return (
      <TouchableOpacity
        key={interview.get('id')}
        style={[styles.interviewBox, expandedStyle]}
        onPress={this.toggleExpanded.bind(this)}
      >

        <View style={{ padding: 10 }}>
          <Text style={styles.boldText}>
            {this.interviewDuration(interview)}
          </Text>

          <Text style={styles.lightSmallText}>
            {capitalize(interview.get('medium'))}
            {' '}
            Interview with
            {' '}
            {interview.get('applicationName')}
          </Text>
        </View>

        {isExpanded
          ? this.renderInterviewExtras(interview, interviewers)
          : null}
      </TouchableOpacity>
    )
  }

  renderInterviewExtras(interview, interviewers) {
    return (
      <View>
        <View style={{ padding: 10 }}>
          <Text style={styles.lightSmallText}>Interviewers</Text>
          {interviewers.map(this.renderInterviewer.bind(this))}
        </View>

        {this.renderInterviewNotes(interview)}
        {this.renderInterviewActions(interview)}
      </View>
    )
  }

  renderInterviewNotes(interview) {
    const notes = interview.get('notes')

    if (notes) {
      return (
        <View style={{ padding: 10 }}>
          <Text style={styles.lightSmallText}>Instructions</Text>
          <Text>
            {interview.get('notes')}
          </Text>
        </View>
      )
    } else {
      return null
    }
  }

  renderInterviewer(interviewer) {
    const identifier = interviewer.get('fullName') || 'No name'

    return (
      <View
        key={interviewer.get('id')}
        style={{ flexDirection: 'row', marginTop: 10 }}
      >
        <Avatar
          key={interviewer.get('id')}
          style={{ marginRight: 5 }}
          user={interviewer}
          size={20}
        />

        <Text style={[styles.smallText, { marginLeft: 5, marginTop: 2 }]}>
          {identifier}
        </Text>
      </View>
    )
  }

  renderInterviewActions(interview) {
    return (
      <View style={styles.interviewActions}>
        <TouchableOpacity
          onPress={this.showApplicationMenu.bind(this, interview)}
          style={{ flex: 1, alignItems: 'flex-start', flexDirection: 'row' }}
        >
          <Text style={[styles.smallText, styles.lightText, styles.boldText]}>
            More
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.goToApplication.bind(this, interview)}
          style={{ flex: 1, alignItems: 'flex-end' }}
        >

          <Text style={[styles.smallText, styles.blueText, styles.boldText]}>
            View Application
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  startTime(interview) {
    let scheduledFor = interview.get('scheduledFor')
    return moment(scheduledFor)
  }

  endTime(interview) {
    let duration = interview.get('duration')
    return this.startTime(interview).clone().add(duration, 'minutes')
  }

  isPastInterview(interview) {
    return this.endTime(interview).isBefore(moment(), 'minute')
  }

  isInNext30Minutes(interview) {
    let timeToGo = this.startTime(interview).diff(moment(), 'minute')
    return timeToGo > 0 && timeToGo <= 30
  }

  interviewDuration(interview) {
    let startTime = this.startTime(interview)
    let endTime = this.endTime(interview)

    return `${startTime.format('h:mm a')} to ${endTime.format('h:mm a z')}`
  }

  goToApplication(interview) {
    const applicationId = interview.get('applicationId')
    return this.props.goToApplication(applicationId)
  }

  showApplicationMenu(interview) {
    let name = interview.get('applicationName')
    let email = interview.get('applicationEmail')
    let phone = interview.get('applicationPhone')

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
            Linking.openURL(`mailto:${email}`)
            break

          default:
            return
        }
      }
    )
  }
}

module.exports = connectActionSheet(InterviewBox)
