import React, { Component } from 'react'
import { connect } from 'react-redux'
import { connectActionSheet } from '@expo/react-native-action-sheet'

import { Text, View, Image, ActivityIndicator } from 'react-native'

import styles from 'enlist/app/styles/overview'
import Colors from 'enlist/app/styles/colors'
import { formatDate, absoluteFormatDate } from 'enlist/app/utils'
import { Button } from 'enlist/app/base'

import { changeApplicationStage } from 'enlist/app/actions'

class CurrentStage extends Component {
  changeStage = () => {
    const { stages } = this.props

    let options = stages.map(stage => stage.get('name')).push('Cancel').toJS()

    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: options.length - 1,
        destructiveButtonIndex: -1
      },
      buttonIndex => {
        const stage = stages.get(buttonIndex)

        if (stage) {
          this.moveToStage(stage)
        }
      }
    )
  }

  moveToStage(stage) {
    const { application, dispatch } = this.props
    dispatch(changeApplicationStage(application, stage))
  }

  render() {
    const { application, stages, isUpdating } = this.props

    const stageName = application.get('currentStageName')
    const lastChangedAt = application.get('stageChangedAt')
    const stage = stages.find(
      stage => stage.get('id') === application.get('currentStageId')
    )

    let rejectedStyle = {}

    if (stage && stage.get('mapTo') === 'rejected') {
      rejectedStyle = {
        backgroundColor: Colors.red
      }
    }

    return (
      <View style={styles.currentStageBox}>
        <Text style={styles.metadata}>Current Stage</Text>
        <Text style={styles.currentStageName}>{stageName}</Text>
        <Text style={styles.lastChangedAt}>
          Last changed {formatDate(lastChangedAt)}
        </Text>

        <Button
          isLoading={isUpdating}
          onPress={this.changeStage}
          style={[styles.changeStageButton, rejectedStyle]}
          textStyle={styles.changeStageButtonText}
          label="Move to another stage"
        />
      </View>
    )
  }
}

module.exports = connect(state => {
  const {
    me,
    stages: StagesList,
    applications: { list: ApplicationsList, isUpdating },
    routing: { props: { applicationId } }
  } = state

  const application = ApplicationsList.find(application => {
    return application.get('id') === applicationId
  })

  const stages = StagesList.filter(
    stage => stage.get('jobId') === application.get('jobId')
  )

  return {
    stages,
    isUpdating
  }
})(connectActionSheet(CurrentStage))
