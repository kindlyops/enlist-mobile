import React, { Component } from 'react'

import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'

import { Header } from 'enlist/app/base'
import { api } from 'enlist/app/utils'
import styles from 'enlist/app/styles'

import JobBox from './box'

class JobsList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { isLoading, jobs } = this.props

    return (
      <View style={{ flex: 1 }}>
        <Header label="Jobs" />
        {isLoading ? this.renderLoading() : this.renderList(jobs)}
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

  renderList(jobs) {
    if (jobs && jobs.size > 0) {
      return this.renderGroupedJobs(jobs)
    } else {
      return (
        <View style={styles.blankSlate}>
          <Text style={[styles.headlineText, { textAlign: 'center' }]}>
            No jobs.
          </Text>

          <Text
            style={[styles.lightText, { textAlign: 'center', marginTop: 5 }]}
          >
            When you create a job, you can see it here.
          </Text>
        </View>
      )
    }
  }

  renderGroupedJobs(jobs) {
    let groupedJobs = jobs.groupBy(job => job.get('category'))

    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#FEFEFE' }}>
        {groupedJobs.entrySeq().map(([category, jobs]) => {
          return this.renderCategory(jobs, category)
        })}
      </ScrollView>
    )
  }

  renderCategory(jobs, category) {
    return (
      <View key={category} style={styles.box}>
        <Text style={styles.boxHeadlineText}>
          {category}
        </Text>

        {jobs.map(job => {
          return (
            <JobBox
              key={job.get('id')}
              job={job}
              goToJob={this.goToJob.bind(this, job)}
            />
          )
        })}
      </View>
    )
  }

  goToJob(job) {
    return this.props.goToJob(job)
  }
}

module.exports = JobsList
