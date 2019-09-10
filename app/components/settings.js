import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  AsyncStorage,
  Alert,
  Linking,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar
} from 'react-native'

import styles from 'enlist/app/styles/settings'
import { Button } from 'enlist/app/base'

const logo = require('enlist/app/images/logo-light.png')

class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditingProfile: false
    }
  }

  askForLogout() {
    Alert.alert(null, 'Are you sure you want to logout?', [
      {
        text: 'No, let me go back',
        onPress: () => {
          return null
        }
      },
      { text: 'Yes', style: 'destructive', onPress: () => this.props.logout() }
    ])
  }

  email() {
    let email = 'mailto:support@enlist.io'

    Linking.openURL(email).catch(error => {
      console.warn(error)
    })
  }

  render() {
    let { account, user } = this.props

    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />

        <View style={styles.logoWrapper}>
          <Image style={{ height: 40, width: 40 }} source={logo} />
        </View>

        <View style={styles.userDetails}>
          <Text style={styles.headlineText}>
            {user.get('fullName') || 'No name'}
          </Text>
          <Text style={styles.lightText}>
            {user.get('email') || 'No e-mail'}
          </Text>
        </View>

        {this.renderAccountDetails(account)}

        <View style={{ flex: 1, padding: 15, justifyContent: 'flex-end' }}>
          <Button
            label="Questions? Just e-mail us."
            onPress={this.email.bind(this)}
          />
          <Button
            type={'accent'}
            label="Logout"
            style={{ marginTop: 15 }}
            onPress={this.askForLogout.bind(this)}
          />
        </View>
      </View>
    )
  }

  renderAccountDetails(account) {
    return null
  }

  renderUserAvatar(user) {
    if (user.get('avatarUrl')) {
      return (
        <Image
          style={{ height: 40, width: 40, borderRadius: 20, marginBottom: 10 }}
          source={{ uri: user.get('avatarUrl') }}
        />
      )
    } else {
      return null
    }
  }
}

module.exports = connect(state => {
  const { me } = state

  return {
    user: me.get('user'),
    account: me.get('details').get('account')
  }
})(Settings)
