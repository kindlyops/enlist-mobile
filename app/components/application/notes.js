import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Text,
  View,
  WebView,
  TouchableOpacity,
  ActivityIndicator,
  LayoutAnimation
} from 'react-native'

import styles from 'enlist/app/styles'

import { api, formatDate, animations } from 'enlist/app/utils'

import Note from './note'
import AddNote from './addNote'
import { Button } from 'enlist/app/base'

import { addNote } from 'enlist/app/actions'

class Notes extends Component {
  constructor(props) {
    super(props)
    this.addNote = this.addNote.bind(this)
  }

  componentDidMount() {
    let { dispatch, notes } = this.props

    if (notes && notes.size === 0) {
      dispatch({ type: 'fetchNotes' })
    }

    this.fetchNotes()
  }

  fetchNotes() {
    let { dispatch, fetchResource } = this.props

    fetchResource('notes')
      .then(json => {
        dispatch({ type: 'addNotes', notes: json.notes })
      })
      .catch(error => {
        console.log(error)
      })
  }

  addNote(text) {
    let { dispatch, application } = this.props
    dispatch(addNote(text, application.get('id'), true))
  }

  userForNote(note) {
    let { users } = this.props

    return users.find(user => {
      return user.get('id') === note.get('createdById')
    })
  }

  render() {
    let { isLoading } = this.props

    if (isLoading) {
      return (
        <View style={[styles.centered, { padding: 40 }]}>
          <ActivityIndicator color="gray" size="small" animating={true} />
        </View>
      )
    } else {
      return (
        <View style={styles.box}>
          {this.renderAddNoteBtn()}
          {this.renderAddNote()}
          {this.renderNotes()}
        </View>
      )
    }
  }

  renderNotes() {
    let { notes } = this.props

    if (notes && notes.size > 0) {
      return notes.map(note => {
        return (
          <Note
            key={note.get('id')}
            note={note}
            createdBy={this.userForNote(note)}
          />
        )
      })
    } else {
      return (
        <View style={[styles.centered, { padding: 15 }]}>
          <Text style={styles.headlineText}>No notes yet.</Text>
        </View>
      )
    }
  }

  renderAddNote() {
    let { isAdding, isSaving, users, dispatch } = this.props

    if (isAdding) {
      return (
        <AddNote
          isSavingNote={isSaving}
          users={users}
          addNote={this.addNote}
          onStop={() => dispatch({ type: 'closeAddNoteModal' })}
        />
      )
    } else {
      return null
    }
  }

  renderAddNoteBtn() {
    let { dispatch } = this.props

    return (
      <Button
        label="Add a note"
        style={{ width: 150, alignSelf: 'flex-end' }}
        onPress={() => dispatch({ type: 'showAddNoteModal' })}
      />
    )
  }
}

module.exports = connect(state => {
  const {
    me,
    routing: { props: { applicationId } },
    notes: { list, isSaving, isLoading, isAdding }
  } = state

  return {
    notes: list.filter(note => {
      return note.get('applicationId') === applicationId
    }),

    isSaving: isSaving,
    isLoading: isLoading,
    isAdding: isAdding,

    currentUser: me.get('user'),
    users: me.get('details').get('users')
  }
})(Notes)
