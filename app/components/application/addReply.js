import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Text, View, TextInput, Image, TouchableOpacity } from 'react-native'

import { KeyboardView, Button } from 'enlist/app/base'
import styles from 'enlist/app/styles/notes'

let dotsBtn = require('enlist/app/images/dots.png')

class AddReplyComponent extends Component {
  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      height: 40,
      email: '',
      isShowingTemplates: false
    }
  }

  onChange({ nativeEvent }) {
    let { text } = nativeEvent

    this.setState({
      email: text,
    })
  }

  onContentSizeChange({ nativeEvent }) {
    let { contentSize: { height } } = nativeEvent

    this.setState({
      height: height,
    })
  }

  onSubmit() {
    return this.props.onAdd(this.state.email)
  }

  render() {
    let { onStop, isSaving } = this.props
    let { height, email, isShowingTemplates } = this.state

    return (
      <KeyboardView onStop={onStop}>
        {isShowingTemplates ? this.renderTemplates() : null}

        <View style={styles.addNoteActions}>
          <TextInput
            style={[styles.addNoteTextArea, { flex: 1, height: height }]}
            autoFocus={true}
            multiline={true}
            onChange={this.onChange.bind(this)}
            onContentSizeChange={this.onContentSizeChange.bind(this)}
            onSubmitEditing={this.onSubmit.bind(this)}
            value={email}
            ref="addEmail"
          />

          <Button isLoading={isSaving} onPress={this.onSubmit.bind(this)} label="Reply" />
        </View>
      </KeyboardView>
    )
  }
}

module.exports.AddReplyComponent = AddReplyComponent

module.exports.AddReply = connect(state => {
  const { me } = state

  return {
    templates: me.get('details').get('emailTemplates')
  }
})(AddReplyComponent)
