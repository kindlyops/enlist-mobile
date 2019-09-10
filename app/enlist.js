import React, { Component } from 'react'
import { fromJS } from 'immutable'

import { Provider } from 'react-redux'
import configureStore from 'enlist/app/store'

import { AsyncStorage, ActivityIndicator, Text, View } from 'react-native'

import App from 'enlist/app/components/app'
import styles from 'enlist/app/styles'

class Enlist extends Component {
  constructor(props) {
    super(props)

    this.state = {
      store: null
    }
  }

  componentWillMount() {
    this._fetchCurrentRoute()
  }

  async _fetchCurrentRoute() {
    try {
      let serialized = await AsyncStorage.getItem('state')
      let parsed = JSON.parse(serialized)
      let nextState = {}

      if (parsed) {
        let { routing: { props } } = parsed
        let nextProps = {}

        if (props) {
          for (key in props) {
            nextProps[key] = fromJS(props[key])
          }
        }

        nextState = {
          ...parsed,

          routing: {
            ...parsed.routing,
            props: nextProps
          },

          me: fromJS(parsed.me)
        }
      }

      this.setState({
        store: configureStore(nextState)
      })
    } catch (err) {
      console.log(err)
      AsyncStorage.multiRemove(['session', 'state'])
    }
  }

  render() {
    let { store } = this.state

    if (!store) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator animating={true} />

          <Text style={[styles.lightSmallText, { marginTop: 5 }]}>
            Just a second...
          </Text>
        </View>
      )
    } else {
      return (
        <Provider store={store}>
          <App />
        </Provider>
      )
    }
  }
}

module.exports = Enlist
