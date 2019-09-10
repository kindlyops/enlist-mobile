import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fromJS, List } from 'immutable'
import dismissKeyboard from 'react-native-dismiss-keyboard'
import Color from 'color'

import {
  ActivityIndicator,
  StatusBar,
  TextInput,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking
} from 'react-native'

import Colors from 'enlist/app/styles/colors'
import styles from 'enlist/app/styles/feedbackOverlay'
import { formatDate } from 'enlist/app/utils'
import { Panel } from 'enlist/app/base'
import AverageRating from 'enlist/app/components/application/averageRating'

let downButton = require('enlist/app/images/down-light.png')

class FeedbackOverlay extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { interview, feedbacks, isLoading, onStop } = this.props

    return (
      <Modal
        animationType={'slide'}
        transparent={false}
        onRequestClose={onStop}
      >
        <StatusBar color="light-content" />

        <TouchableOpacity style={styles.backStripe} onPress={onStop}>
          <Image
            style={{ height: 6.5, width: 12, marginTop: 1 }}
            source={downButton}
          />

          <Text style={styles.backStripeText}>
            Back to application
          </Text>
        </TouchableOpacity>

        <ScrollView
          ref="_scrollView"
          style={{ flex: 1 }}
          contentContainerStyle={styles.feedback}
        >

          {this.renderHeader(interview, feedbacks)}
          {feedbacks.map(this.renderFeedback)}

          <TouchableOpacity
            style={{ flex: 1 }}
            onpress={e => {
              dismisskeyboard()
            }}
          />
        </ScrollView>
      </Modal>
    )
  }

  renderHeader = (interview, feedbacks) => {
    const formName = interview.get('formName')
    const completedAt = interview.get('completedAt')

    return (
      <View style={styles.header}>
        <View style={styles.headerDetails}>
          <Text style={styles.headerText}>{formName}</Text>
          <Text style={styles.metadata}>
            Completed {formatDate(completedAt)}
          </Text>
        </View>

        <AverageRating feedbacks={feedbacks} />
      </View>
    )
  }

  renderFeedback = feedback => {
    const answers = feedback.get('answers')
    const averageRatingComponent = (
      <AverageRating small={true} feedback={feedback} />
    )

    return (
      <Panel
        key={feedback.get('id')}
        headerText={feedback.get('createdByName')}
        headerExtra={averageRatingComponent}
      >

        <View style={styles.box}>
          {answers.map(this.renderAnswer)}
        </View>
      </Panel>
    )
  }

  renderAnswer = answer => {
    const field = answer.get('question').get('field')

    switch (field) {
      case 'rating':
        return this.renderRatingAnswer(answer)
        break

      case 'file':
        return this.renderFileAnswer(answer)
        break

      default:
        return this.renderBasicAnswer(answer)
        break
    }
  }

  renderBasicAnswer = answer => {
    return (
      <View key={answer.get('id')} style={styles.answer}>
        <Text style={styles.questionText}>
          {answer.get('question').get('label')}
        </Text>
        <Text style={styles.answerText}>{answer.get('text')}</Text>
      </View>
    )
  }

  renderFileAnswer = answer => {
    const document = answer.get('document')
    const attachmentURL = document.get('downloadUrl')
    const pdfAttachmentURL = document.get('pdfDownloadUrl')

    const url = pdfAttachmentURL || attachmentURL

    return (
      <View key={answer.get('id')} style={styles.answer}>
        <Text style={styles.questionText}>
          {answer.get('question').get('label')}
        </Text>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: Color(Colors.blue).lighten(0.5),
            padding: 10,
            borderRadius: 5,
            alignItems: 'center'
          }}
          onPress={() => Linking.openURL(url)}
        >
          <Text style={{ fontSize: 12, fontWeight: '500', color: Colors.blue }}>
            Open attachment in browser
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderRatingAnswer = answer => {
    const ratings = answer.get('ratings')

    return (
      <View key={answer.get('id')} style={styles.answer}>
        <Text style={styles.questionText}>
          {answer.get('question').get('label')}
        </Text>
        <View style={styles.ratings}>
          {ratings.map(this.renderRating)}
        </View>
      </View>
    )
  }

  renderRating = (rating, idx) => {
    return (
      <View style={styles.rating} key={idx}>
        <View style={styles.ratingCriterion}>
          <Text style={styles.ratingCriterionText}>
            {rating.get('criteria')}
          </Text>
        </View>
        <View style={styles.ratingScale}>
          <Text style={styles.ratingScaleText}>{rating.get('scale')}</Text>
        </View>
      </View>
    )
  }
}

module.exports = FeedbackOverlay
