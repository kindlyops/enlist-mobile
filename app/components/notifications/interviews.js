import React, { Component } from 'react'
import moment from 'moment'

import { Text, View, Image, ActivityIndicator } from 'react-native'

import styles from 'enlist/app/styles'
import Colors from 'enlist/app/styles/colors'
import { InterviewBox } from 'enlist/app/base'

let noInterviewsImage = require('enlist/app/images/no-events-light.png')

class InterviewsToday extends Component {
  constructor(props) {
    super(props)
  }

  filteredInterviews(interviews) {
    return interviews.filter(interview => {
      return moment(interview.get('scheduledFor')).isSame(moment(), 'day')
    })
  }

  render() {
    let { isLoading, interviews } = this.props

    if (isLoading) {
      return this.renderLoading()
    } else {
      return (
        <View
          style={{
            backgroundColor: Colors.lightGray,
            borderBottomColor: Colors.mediumGray,
            borderBottomWidth: 1
          }}
        >
          {this.renderInterviews(this.filteredInterviews(interviews))}
        </View>
      )
    }
  }

  renderLoading() {
    return (
      <View style={{ padding: 40 }}>
        <ActivityIndicator animating={true} />
      </View>
    )
  }

  renderInterviews(interviews) {
    if (interviews && interviews.size > 0) {
      return (
        <View style={styles.box}>
          <Text style={styles.boxHeadlineText}>
            Interviews Today
          </Text>

          {interviews.map(this.renderInterview)}
        </View>
      )
    } else {
      return (
        <View style={[styles.centered, { padding: 40 }]}>
          <Image
            style={{ width: 28.5, height: 29.5 }}
            source={noInterviewsImage}
          />
          <Text style={{ marginTop: 10, fontWeight: '500', fontSize: 16 }}>
            No interviews today.
          </Text>
        </View>
      )
    }
  }

  interviewersFor = interview => {
    const { users } = this.props
    const interviewerIds = interview.get('interviewerIds')

    return users.filter(user => {
      return interviewerIds.includes(user.get('id'))
    })
  }

  renderInterview = interview => {
    return (
      <InterviewBox
        key={interview.get('id')}
        interview={interview}
        interviewers={this.interviewersFor(interview)}
        goToApplication={this.props.goToApplication}
      />
    )
  }
}

module.exports = InterviewsToday
