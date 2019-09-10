import React, { Component } from 'react'
import { connect } from 'react-redux'
import { includes } from 'lodash'

import { Text, View, ScrollView, ActivityIndicator } from 'react-native'

import styles from 'enlist/app/styles'
import ThreadsList from './threadslist'

class Threads extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false
    }
  }

  componentDidMount() {
    let { fetchResource, dispatch } = this.props

    this.setState({
      isLoading: true
    })

    fetchResource('threads')
      .then(json => {
        dispatch({ type: 'addThreads', threads: json.threads || [] })
        dispatch({ type: 'addEmails', emails: json.emails || [] })
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  render() {
    let { application, threads, children } = this.props
    let { isLoading } = this.state

    if (isLoading) {
      return (
        <View style={[styles.centered, { padding: 40 }]}>
          <ActivityIndicator color="gray" size="small" animating={true} />
        </View>
      )
    } else {
      return (
        <ScrollView
          scrollsToTop={true}
          keyboardShouldPersistTaps={true}
          style={{ flex: 1, backgroundColor: 'white' }}
        >
          {React.Children.map(children, child => {
            return React.cloneElement(child, {
              threads: threads,
              application: application
            })
          })}
        </ScrollView>
      )
    }
  }
}

module.exports = connect(state => {
  const { routing: { props: { applicationId } } } = state

  return {
    threads: state.threads.list.filter(thread => {
      return thread.get('applicationId') === applicationId
    })
  }
})(Threads)
