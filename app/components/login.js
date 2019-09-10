import React, { Component } from 'react'
import dismissKeyboard from 'react-native-dismiss-keyboard'

import {
  Animated,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Linking,
  KeyboardAvoidingView
} from 'react-native'

import { isEmpty } from 'lodash'
import styles from 'enlist/app/styles'
import { api } from 'enlist/app/utils'
import { ErrorBox, Button } from 'enlist/app/base'

const logoImage = require('enlist/app/images/logo.png')

class Login extends Component {
  constructor() {
    super()

    this.state = {
      user: {
        username: '',
        password: '',
        grantType: 'password'
      },

      isVisible: false,
      isLoading: false,
      errors: [],

      logoOffset: new Animated.Value(-20),
      formOffset: new Animated.Value(50)
    }
  }

  componentDidMount() {
    let { logoOffset, formOffset } = this.state

    Animated.parallel([
      Animated.spring(logoOffset, { duration: 150, toValue: 0, friction: 10 }),
      Animated.spring(formOffset, { duration: 150, toValue: 0, friction: 5 })
    ]).start()

    this.setState({
      isVisible: true
    })
  }

  componentWillUnmount() {
    this.setState({
      isVisible: false
    })
  }

  tryLogin() {
    let { user, logoOffset, formOffset } = this.state

    if (!/@/.test(user.username)) {
      this.setState({
        errors: ["That doesn't look like an email"]
      })

      return
    }

    this.setState({ isLoading: true })
    dismissKeyboard()

    api
      .post(api.url('token'), user, false)
      .then(response => {
        Animated.parallel([
          Animated.spring(logoOffset, {
            duration: 150,
            toValue: 100,
            friction: 10
          }),
          Animated.spring(formOffset, {
            duration: 150,
            toValue: 500,
            friction: 5
          })
        ]).start()

        setTimeout(() => {
          this.props.onLogin(response)
        }, 500)
      })
      .catch(response => {
        console.log(response)
        let errors = {}

        if (response.status === 422) {
          errors = response.errors
        } else {
          errors.push({
            base: `Something went wrong. That's our mistake. Please try again in a moment`
          })
        }

        if (this.state.isVisible) this.setState({ errors, isLoading: false })
      })
  }

  update(attr, value) {
    let { user } = this.state
    user[attr] = value

    this.setState({ user, errors: [] })
  }

  render() {
    let { isLoading, logoOffset, formOffset } = this.state

    return (
      <KeyboardAvoidingView style={styles.loginBox}>
        <Animated.View
          style={[
            styles.logoBox,
            {
              transform: [
                {
                  translateY: logoOffset
                }
              ]
            }
          ]}
        >

          <Image style={styles.logo} source={logoImage} />
          {this.renderLoadingView()}

        </Animated.View>

        <Animated.View
          style={[
            styles.loginForm,
            {
              transform: [
                {
                  translateY: formOffset
                }
              ]
            }
          ]}
        >

          {this.renderErrors()}

          <View style={styles.fieldset}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              autoCorrect={false}
              autoFocus={true}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={this.update.bind(this, 'username')}
              onSubmitEditing={e => this.refs.password.focus()}
            />
          </View>

          <View style={styles.fieldset}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              ref="password"
              style={styles.input}
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={this.update.bind(this, 'password')}
              onSubmitEditing={e => this.tryLogin()}
            />
          </View>

          <View style={{ padding: 10 }}>
            <Button
              isLoading={isLoading}
              onPress={this.tryLogin.bind(this)}
              label="Log In"
            />
          </View>
        </Animated.View>

        <View
          style={{
            backgroundColor: '#FCFCFC',
            padding: 10,
            alignItems: 'center'
          }}
        >
          <Text onPress={this.emailSupport.bind(this)} style={{ fontSize: 12 }}>
            Need help? Please contact support@enlist.io.
          </Text>
        </View>
      </KeyboardAvoidingView>
    )
  }

  emailSupport() {
    let email = 'mailto:support@enlist.io'

    Linking.openURL(email).catch(error => {
      console.warn(error)
    })
  }

  renderLoadingView() {
    let { isLoading } = this.state

    if (isLoading) {
      return (
        <Text style={[styles.lightSmallText, { marginTop: 10 }]}>
          Just a second...
        </Text>
      )
    } else {
      return null
    }
  }

  renderErrors() {
    let { errors } = this.state

    if (errors && !isEmpty(errors)) {
      return <ErrorBox errors={errors} />
    }
  }
}

module.exports = Login
