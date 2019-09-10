import React, { Component } from 'react'
import { connect } from 'react-redux'
import { map, filter } from 'lodash'
import { connectActionSheet } from '@expo/react-native-action-sheet'

import { Text, View, Linking, ActivityIndicator } from 'react-native'

import Colors from 'enlist/app/styles/colors'
import styles from 'enlist/app/styles/overview'
import { api, formatDate, absoluteFormatDate } from 'enlist/app/utils'
import { Panel, Button } from 'enlist/app/base'
import { fetchInterviews } from 'enlist/app/actions'

import InterviewBox from 'enlist/app/components/application/interviewBox'
import CurrentStage from 'enlist/app/components/application/currentStage'

class Overview extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.fetchInterviews()
  }

  fetchInterviews() {
    const { applicationId, dispatch } = this.props
    dispatch(fetchInterviews({ application_id: applicationId }))
  }

  render() {
    const {
      application,
      interviews,
      isLoadingInterviews,
      isLoadingFeedbacks
    } = this.props

    return (
      <View style={{ paddingBottom: 20 }}>
        {this.renderStage(application)}
        {isLoadingInterviews
          ? this.renderLoading()
          : this.renderUpcomingInterviews(interviews)}
        {isLoadingFeedbacks
          ? this.renderLoading()
          : this.renderCompletedInterviews(interviews)}
        {this.renderProfile(application)}
        {this.renderResume(application)}
      </View>
    )
  }

  renderLoading() {
    return (
      <View style={{ flex: 1, padding: 15 }}>
        <ActivityIndicator animating={true} />
      </View>
    )
  }

  renderProfile(application) {
    return (
      <Panel headerText="Application Details">
        <View style={[styles.box, { padding: 10, paddingTop: 0 }]}>
          {this.renderProfileDetail(application, 'E-mail', 'email')}
          {this.renderProfileDetail(application, 'Phone', 'phone')}
          {this.renderProfileDetail(application, 'Source', 'source')}
        </View>
      </Panel>
    )
  }

  renderProfileDetail(application, label, attr) {
    return (
      <View style={{ marginTop: 10 }}>
        <Text
          style={{ color: Colors.textGray, fontWeight: '500', fontSize: 12 }}
        >
          {label}
        </Text>
        <Text style={{ marginTop: 3 }}>
          {application.get(attr) || 'Not Provided'}
        </Text>
      </View>
    )
  }

  renderStage(application) {
    return <CurrentStage application={application} />
  }

  renderResume(application) {
    return null
  }

  renderUpcomingInterviews(interviews) {
    const upcoming = interviews.filterNot(interview =>
      interview.get('completed')
    )

    if (upcoming && upcoming.size > 0) {
      const grouped = upcoming.groupBy(interview =>
        absoluteFormatDate(interview.get('scheduledFor'))
      )

      return (
        <Panel headerText="Upcoming Interviews" headerCount={upcoming.size}>
          <View style={styles.box}>
            {grouped.entrySeq().map(this.renderInterviewGroup)}
          </View>
        </Panel>
      )
    } else {
      return null
    }
  }

  renderInterviewGroup = ([group, interviews]) => {
    return (
      <View key={group} style={{ padding: 5, paddingLeft: 15 }}>
        <Text
          style={[
            {
              color: '#616874',
              fontSize: 13,
              fontWeight: '500',
              marginBottom: 5
            }
          ]}
        >
          {group}
        </Text>

        {interviews.map(this.renderInterview)}
      </View>
    )
  }

  renderCompletedInterviews(interviews) {
    const completed = interviews.filter(interview => interview.get('completed'))

    if (completed && completed.size > 0) {
      return (
        <Panel headerText="Feedback" headerCount={completed.size}>
          <View style={styles.box}>
            {completed.map(this.renderInterview)}
          </View>
        </Panel>
      )
    } else {
      return null
    }
  }

  feedbackFor(interview) {
    return this.props.feedbacks.filter(feedback => {
      return feedback.get('feedbackable').get('id') === interview.get('id')
    })
  }

  renderInterview = interview => {
    return (
      <InterviewBox
        key={interview.get('id')}
        interview={interview}
        feedbacks={this.feedbackFor(interview)}
      />
    )
  }
}

module.exports = connect(state => {
  const {
    me,
    interviews: { list: InterviewsList, isLoading: isLoadingInterviews },
    feedbacks: { list: FeedbacksList, isLoading: isLoadingFeedbacks },
    routing: { props: { applicationId } }
  } = state

  const interviews = InterviewsList.filter(
    interview => interview.get('applicationId') === applicationId
  )

  const interviewIds = interviews.map(interview => interview.get('id'))

  const feedbacks = FeedbacksList.filter(feedback =>
    interviewIds.includes(feedback.get('feedbackable').get('id'))
  )

  return {
    applicationId,
    interviews,
    isLoadingInterviews,
    feedbacks,
    isLoadingFeedbacks
  }
})(connectActionSheet(Overview))
