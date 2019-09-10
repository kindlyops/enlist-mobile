import React, { Component } from 'react'

import { Text, View, Image } from 'react-native'

import { Avatar } from 'enlist/app/base'
import styles from 'enlist/app/styles'
import { formatDate } from 'enlist/app/utils'

class Note extends Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(props) {
    const { note, createdBy } = this.props
    return note !== props.note && createdBy !== props.createdBy
  }

  render() {
    let { note, createdBy } = this.props

    return (
      <View style={styles.noteBox}>
        {this.renderNoteText(note)}

        <View style={styles.noteMetadata}>
          <Text style={[styles.noteMetadataText]}>
            {createdBy.get('fullName')} on {formatDate(note.get('createdAt'))}
          </Text>
        </View>
      </View>
    )
  }

  renderNoteText(note) {
    const linkedText = note.get('linkedText').replace(/<[^>]*>/gi, '')

    return (
      <Text style={styles.noteBoxText}>
        {linkedText}
      </Text>
    )
  }
}

module.exports = Note
