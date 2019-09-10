import React, { Component } from 'react'
import { capitalize } from 'lodash'

import { Text, View } from 'react-native'

import styles from 'enlist/app/styles'

class ErrorBox extends Component {
  constructor(props) {
    super(props)
  }

  errors() {
    let { errors } = this.props
    let errorsArray = []

    for (error in errors) {
      if (error === 'base') {
        errorsArray.push(`${errors[error]}`)
      } else {
        errorsArray.push(`${capitalize(error)} ${errors[error]}`)
      }
    }

    return errorsArray
  }

  render() {
    let errors = this.errors()

    if (errors && errors.length > 0) {
      return (
        <View style={[styles.errors, { marginBottom: 10 }]}>
          {errors.map(error => {
            return (
              <Text style={styles.redText} key={error}>
                {error}
              </Text>
            )
          })}
        </View>
      )
    } else {
      return null
    }
  }
}

module.exports = ErrorBox
