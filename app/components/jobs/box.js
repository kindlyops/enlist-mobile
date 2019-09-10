import React, { Component } from 'react'
import { head } from 'lodash'

import { Text, View, TouchableOpacity } from 'react-native'

import styles from 'enlist/app/styles'

class JobBox extends Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(props, state) {
    return this.props.job !== props.job
  }

  render() {
    let { job, goToJob } = this.props
    let color = this.jobStatusColor(job)

    return (
      <TouchableOpacity style={styles.jobBox} onPress={goToJob}>
        <View style={[styles.indicator, { backgroundColor: color }]} />
        <Text style={styles.boldText}>{job.get('title')}</Text>

        <View style={{ flexDirection: 'row', marginTop: 2 }}>
          <Text style={[styles.lightText, { fontSize: 13 }]}>
            {job.get('jobType')}
          </Text>
          <Text style={[styles.lightText, { marginLeft: 5 }]}>·</Text>
          <Text style={[styles.lightText, { fontSize: 13, marginLeft: 5 }]}>
            {this.getJobLocation(job)}
          </Text>
          {this.renderApplicationsCount(job.get('applicationsCount'))}
        </View>
      </TouchableOpacity>
    )
  }

  renderApplicationsCount(count) {
    if (count > 0) {
      let root = count === 1 ? 'application' : 'applications'

      return (
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.lightText, { marginLeft: 5 }]}>·</Text>
          <Text style={[styles.lightText, { fontSize: 13, marginLeft: 5 }]}>
            {count} {root}
          </Text>
        </View>
      )
    } else {
      return null
    }
  }

  jobStatusColor(job) {
    let statuses = ['inactive', 'active', 'paused', 'closed']
    let statusColors = ['#C1C7D4', '#7DDC15', '#ED7E2B', '#F21D1D']

    let color = statusColors[job.get('status')]

    if (color) {
      return color
    } else {
      return head(statusColors)
    }
  }

  getJobLocation(job) {
    if (job.get('remote')) {
      return 'Remote'
    } else {
      return `${job.get('city')}`
    }
  }
}

module.exports = JobBox
