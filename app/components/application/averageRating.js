import React from 'react'
import Color from 'color'
import Colors from 'enlist/app/styles/colors'
import styles from 'enlist/app/styles/feedbackOverlay'

import { Text, View } from 'react-native'

const getAverageRating = props => {
  const { feedbacks } = props

  const ratings = feedbacks
    .filterNot(feedback => !feedback.get('rating'))
    .map(feedback => feedback.get('rating'))

  const sum = ratings.reduce((a, b) => a + b)

  return sum / ratings.size
}

const AverageRating = props => {
  const { feedbacks, feedback } = props

  let type
  let textStyle = {}
  let viewStyle = {}
  let averageRating

  if (!!feedbacks) {
    averageRating = getAverageRating(props)
  } else {
    averageRating = feedback.get('rating')
  }

  if (props.small) {
    textStyle = {
      fontSize: 12,
      fontWeight: '600'
    }

    viewStyle = {
      padding: 4,
      paddingLeft: 5,
      paddingRight: 5,
      minWidth: 20
    }
  }

  if (averageRating) {
    if (averageRating >= 4) {
      type = 'green'
    } else if (averageRating > 2 && averageRating < 4) {
      type = 'blue'
    } else {
      type = 'red'
    }

    return (
      <View
        style={[
          styles.averageRating,
          { borderWidth: 1, borderColor: Color(Colors[type]).lighten(0.5) },
          viewStyle
        ]}
      >
        <Text
          style={[
            { color: Colors[type], fontSize: 12, fontWeight: '600' },
            textStyle
          ]}
        >
          {averageRating}
        </Text>
      </View>
    )
  } else {
    return null
  }
}

module.exports = AverageRating
