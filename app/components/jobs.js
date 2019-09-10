import React, { Component } from 'react'
import { connect } from 'react-redux'

import { AsyncStorage, Text, View } from 'react-native'

import { api } from 'enlist/app/utils'
import { fetchJobs } from 'enlist/app/actions'
import styles from 'enlist/app/styles'

import JobsList from './jobs/list'
import Job from './job'
import Application from './application'

class Jobs extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(fetchJobs())
  }

  goToJob(job) {
    let { dispatch } = this.props

    dispatch({
      type: 'goTo',
      route: 'job',
      props: {
        jobId: job.get('id')
      }
    })
  }

  render() {
    let { jobs, isLoading, children } = this.props

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {React.Children.map(children, child => {
            return React.cloneElement(child, {
              isLoading: isLoading,
              jobs: jobs,
              goToJob: this.goToJob.bind(this)
            })
          })}
        </View>
      </View>
    )
  }
}

module.exports = connect(state => {
  return {
    jobs: state.jobs.list,
    isLoading: state.jobs.isLoading
  }
})(Jobs)
