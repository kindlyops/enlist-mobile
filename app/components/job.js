import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native'

import styles from 'enlist/app/styles'

import { Header } from 'enlist/app/base'
import { api } from 'enlist/app/utils'
import { fetchApplications, fetchJobs } from 'enlist/app/actions'

import Slide from 'enlist/app/components/animations/slide'

import Application from './application'
import ApplicationsList from './applications/list'
import JobMetadata from './jobs/meta'

class Job extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let { dispatch, jobId } = this.props

    dispatch(fetchJobs())

    dispatch(
      fetchApplications({
        jobId
      })
    )
  }

  goBack() {
    return this.props.dispatch({
      type: 'goBack'
    })
  }

  render() {
    let { job, isLoadingJobs } = this.props

    if (isLoadingJobs) {
      return this.renderLoading()
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Header label={job.get('title')} onBack={this.goBack.bind(this)} />

          <Slide offset={100} style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: '#FEFEFE' }}>
              <JobMetadata job={job} style={{ padding: 15 }} />
              {this.renderApplications()}
            </View>
          </Slide>
        </View>
      )
    }
  }

  renderLoading() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator animating={true} />
      </View>
    )
  }

  renderApplications() {
    let {
      isLoadingApplications,
      isLoadingApplicationsInBackground,
      applications
    } = this.props

    if (isLoadingApplications) {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator animating={true} />
        </View>
      )
    } else if (applications && applications.size > 0) {
      return (
        <View style={{ flex: 1 }}>
          <ApplicationsList
            isUpdating={isLoadingApplicationsInBackground}
            applications={applications}
            goToApplication={this.goToApplication.bind(this)}
          />
        </View>
      )
    } else {
      return (
        <View style={styles.blankSlate}>
          <Text style={[styles.headlineText, { textAlign: 'center' }]}>
            No applications yet.
          </Text>

          <Text
            style={[styles.lightText, { textAlign: 'center', marginTop: 5 }]}
          >
            When an application comes in, it will show up here.
          </Text>
        </View>
      )
    }
  }

  goToApplication(application) {
    let { dispatch, job } = this.props

    return dispatch({
      type: 'goTo',
      previousRoute: 'job',
      route: 'application',
      props: {
        applicationId: application.get('id')
      }
    })
  }
}

module.exports = connect(state => {
  const { jobs, applications, routing: { props: { jobId } } } = state

  return {
    jobId,

    job: jobs.list.find(job => {
      return job.get('id') === jobId
    }),

    applications: applications.list.filter(application => {
      return application.get('jobId') === jobId
    }),

    isLoadingJobs: jobs.isLoading,
    isLoadingApplications: applications.isLoading,
    isLoadingApplicationsInBackground: applications.isLoadingInBackground
  }
})(Job)
