import React, { Component } from 'react'
import { fromJS, is } from 'immutable'

import {
  Text,
  View,
  ScrollView,
  ListView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'

import styles from 'enlist/app/styles'
import { formatDate } from 'enlist/app/utils'

class ApplicationsList extends Component {
  constructor(props) {
    super(props)

    const { applications } = this.props

    const dataSource = new ListView.DataSource({
      rowHasChanged: (a, b) => !is(a, b)
    })

    this.state = {
      applications: dataSource.cloneWithRows(applications.toJS())
    }
  }

  render() {
    const { applications } = this.state
    const { isUpdating } = this.props

    return (
      <View style={{ flex: 1, padding: 15 }}>
        {isUpdating ? this.renderUpdating() : null}

        <ListView
          dataSource={applications}
          renderRow={application => this.renderApplication(application)}
        />
      </View>
    )
  }

  renderUpdating() {
    return (
      <View style={styles.applicationsListUpdating}>
        <ActivityIndicator animating={true} />
        <Text style={[{ marginLeft: 5 }, styles.lightSmallText]}>Updating</Text>
      </View>
    )
  }

  renderApplication(application) {
    return (
      <TouchableOpacity
        onPress={this.props.goToApplication.bind(this, fromJS(application))}
        key={application.id}
        style={[styles.applicationBox, { margin: 5, marginBottom: 0 }]}
      >

        <Text style={styles.boldText}>
          {application.fullName}
        </Text>

        <View style={{ flexDirection: 'row', marginTop: 3 }}>
          <Text style={styles.lightSmallText}>
            {application.currentStageName}
          </Text>

          <Text style={{ marginLeft: 5, marginRight: 5 }}>
            ·
          </Text>

          <Text style={styles.lightSmallText}>
            {formatDate(application.lastInteractedAt) ||
              formatDate(application.updatedAt)}
          </Text>
        </View>

        {this.renderApplicationTags(application)}
      </TouchableOpacity>
    )
  }

  renderApplicationTags(application) {
    const tagNames = application.tagNames

    if (tagNames && tagNames.length > 0) {
      return (
        <View style={styles.tags}>
          {tagNames.map(tag => {
            return (
              <View key={tag} style={styles.tag}>
                <Text style={[styles.lightText, { fontSize: 12 }]}>{tag}</Text>
              </View>
            )
          })}
        </View>
      )
    } else {
      return null
    }
  }
}

module.exports = ApplicationsList
