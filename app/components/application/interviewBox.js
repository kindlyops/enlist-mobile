import React, { Component } from 'react'
import { capitalize } from 'lodash'
import moment from 'moment'

import { Text, View, TouchableOpacity } from 'react-native'

import Colors from 'enlist/app/styles/colors'
import styles from 'enlist/app/styles/overview'
import Avatar from 'enlist/app/components/base/avatar'
import { formatDate } from 'enlist/app/utils'
import FeedbackOverlay from 'enlist/app/components/application/feedbackOverlay'
import AverageRating from 'enlist/app/components/application/averageRating'

class InterviewBox extends Component {
  constructor(props) {
    super()

    this.state = {
      isShowingFeedback: false
    }
  }

  render() {
    const { interview, feedbacks } = this.props
    const isCompleted = interview.get('completed')

    if (isCompleted) {
      return this.completeInterview(interview, feedbacks)
    } else {
      return this.incompleteInterview(interview, feedbacks)
    }
  }

  startTime(interview) {
    let scheduledFor = interview.get('scheduledFor')
    return moment(scheduledFor)
  }

  endTime(interview) {
    let duration = interview.get('duration')
    return this.startTime(interview).clone().add(duration, 'minutes')
  }

  findDuration(interview) {
    let startTime = this.startTime(interview)
    let endTime = this.endTime(interview)

    return `${startTime.format('h:mm a')} to ${endTime.format('h:mm a z')}`
  }

  incompleteInterview(interview) {
    const formName = interview.get('formName')
    const medium = interview.get('medium')

    return (
      <View style={styles.interviewBox}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.headerText, { fontWeight: '400' }]}>
            {this.findDuration(interview)}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={styles.metadata}
            >{`${capitalize(medium)} Interview`}</Text>
            <Text style={styles.separatorText}> · </Text>
            <Text style={styles.metadata}>{formName}</Text>
          </View>
        </View>
      </View>
    )
  }

  completeInterview(interview, feedbacks) {
    const { isShowingFeedback } = this.state

    const medium = interview.get('medium')
    const formName = interview.get('formName')

    return (
      <View>
        {isShowingFeedback ? this.renderFeedbackOverlay() : null}

        <TouchableOpacity
          style={styles.interviewBox}
          onPress={e => {
            this.setState({ isShowingFeedback: true })
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.headerText}>{formName}</Text>

            <View style={{ flexDirection: 'row' }}>
              <Text
                style={styles.metadata}
              >{`${capitalize(medium)} Interview`}</Text>
              <Text style={styles.separatorText}> · </Text>
              {this.interviewStatus(interview)}
            </View>
          </View>

          <AverageRating small={true} feedbacks={feedbacks} />
        </TouchableOpacity>
      </View>
    )
  }

  renderFeedbackOverlay() {
    const { feedbacks, interview } = this.props

    return (
      <FeedbackOverlay
        feedbacks={feedbacks}
        interview={interview}
        onStop={() => {
          this.setState({ isShowingFeedback: false })
        }}
      />
    )
  }

  interviewStatus(interview) {
    let text
    let isCompleted = interview.get('completed')

    const formName = interview.get('formName')
    const scheduledFor = interview.get('scheduledFor')

    if (isCompleted) {
      text = `${formatDate(scheduledFor)}`
    } else {
      text = `Scheduled for ${scheduledFor}`
    }

    return (
      <Text style={styles.metadata}>
        {text}
      </Text>
    )
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
          size={16}
        />

        <Text style={styles.interviewerName}>
          {identifier}
        </Text>
      </View>
    )
  }
}

module.exports = InterviewBox
