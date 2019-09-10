import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import { includes, isEmpty } from 'lodash'
import dismissKeyboard from 'react-native-dismiss-keyboard'

import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Picker,
  ScrollView
} from 'react-native'

import styles from 'enlist/app/styles/notes'

import { api } from 'enlist/app/utils'
import { Button, ErrorBox, KeyboardView } from 'enlist/app/base'

class AddNote extends Component {
  constructor(props) {
    super(props)

    const { text } = this.props

    this.state = {
      isMentioning: false,
      text: text,
      searchTerm: '',
      actionHeight: 40
    }
  }

  insertMention(username) {
    let { text } = this.state
    let words = text.split(' ')
    let lastWord = words[words.length - 1]

    if (includes(lastWord, '@')) {
      words.pop()
    }

    words.push(`@${username}`)

    let nextNote = words.join(' ')

    this.setState(
      {
        text: nextNote,
        isMentioning: false
      },
      () => {
        this.refs.addNote.focus()
      }
    )
  }

  onChangeNote({ nativeEvent }) {
    let { text, contentSize: { height } } = nativeEvent

    this.setState({
      text: text,
      actionHeight: height
    })

    this.handleMentions(text)
  }

  handleMentions(text) {
    let words = text.split(' ')
    let lastWord = words[words.length - 1]

    if (includes(lastWord, '@')) {
      this.setState({
        isMentioning: true,
        searchTerm: lastWord.replace('@', '')
      })
    } else {
      this.setState({
        isMentioning: false,
        searchTerm: ''
      })
    }
  }

  addNote() {
    return this.props.addNote(this.state.text)
  }

  render() {
    let { actionHeight, visibleHeight, isMentioning, text } = this.state
    let { onStop, addNote, isSavingNote } = this.props

    return (
      <KeyboardView onStop={onStop}>
        {isMentioning ? this.renderPicker() : null}

        <View style={styles.addNoteActions}>
          <TextInput
            style={[styles.addNoteTextArea, { flex: 1, height: actionHeight }]}
            autoFocus={true}
            multiline={true}
            onChange={this.onChangeNote.bind(this)}
            onSubmitEditing={this.addNote.bind(this)}
            placeholder="Add a note..."
            value={text}
            ref="addNote"
          />

          <Button
            isLoading={isSavingNote}
            onPress={this.addNote.bind(this)}
            label="Add"
          />
        </View>
      </KeyboardView>
    )
  }

  renderPicker() {
    let { users } = this.props
    let { searchTerm } = this.state

    if (searchTerm) {
      users = users.filter(user => {
        const fullName = user.get('fullName')
        const email = user.get('email')

        return (
          (fullName && includes(fullName, searchTerm)) ||
          (email && includes(email, searchTerm))
        )
      })
    }

    if (users && users.size > 0) {
      return (
        <View style={styles.atPicker} testID="add-note-users">
          {users.map(user => {
            return this.renderPickerUser(user)
          })}
        </View>
      )
    } else {
      return null
    }
  }

  renderPickerUser(user) {
    let identifier = user.get('fullName') || 'No name'

    return (
      <TouchableOpacity
        key={user.get('id')}
        style={styles.atPickerUser}
        onPress={() => {
          this.insertMention(user.get('username'))
        }}
      >
        <Text style={styles.boldText}>{identifier}</Text>
        <Text style={{ marginLeft: 5, marginRight: 5 }}>·</Text>
        <Text style={styles.lightSmallText}>{user.get('email')}</Text>
      </TouchableOpacity>
    )
  }
}

AddNote.defaultProps = {
  text: ''
}

module.exports = AddNote
