import React, { Component } from 'react'
import { head } from 'lodash'

import { Picker, Modal, Text, View, TouchableOpacity } from 'react-native'

import styles from 'enlist/app/styles'

class Select extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedValue: ''
    }
  }

  didSelect(value) {
    this.setState({
      selectedValue: value
    })
  }

  submit() {
    let { onChange } = this.props
    let { selectedValue } = this.state

    onChange(selectedValue)
  }

  render() {
    let { label, data, onChange, onClose } = this.props
    let { selectedValue } = this.state

    return (
      <Modal transparent={true} onRequestClose={onClose}>
        <View style={styles.fadeScreen}>
          <View style={styles.selectModal}>
            <View style={styles.selectModalStripe}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={onClose}>
                  <Text style={[styles.redText]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={this.submit.bind(this)}>
                <Text style={[styles.blueText]}>
                  {label}
                </Text>
              </TouchableOpacity>
            </View>

            <Picker
              onValueChange={this.didSelect.bind(this)}
              selectedValue={selectedValue}
            >
              {data.map(datum => {
                return <Picker.Item key={datum.value} {...datum} />
              })}
            </Picker>
          </View>
        </View>
      </Modal>
    )
  }
}

module.exports = Select
