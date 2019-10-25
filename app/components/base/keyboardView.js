import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions } from "react-native";
import dismissKeyboard from "react-native-dismiss-keyboard";

import {
  Animated,
  Text,
  View,
  Keyboard,
  Modal,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  Platform
} from "react-native";

import styles from "enlist/app/styles";
import { animations } from "enlist/app/utils";

class KeyboardView extends Component {
  constructor(props) {
    super(props);

    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);

    this.state = {
      visibleHeight: Dimensions.get("window").height,
      opacity: new Animated.Value(0)
    };
  }

  componentWillUpdate(props, state) {
    if (this.state.visibleHeight === state.visibleHeight) return;
    LayoutAnimation.configureNext(animations.layout.spring);
  }

  componentWillMount() {
    Keyboard.addListener("keyboardWillShow", this.keyboardWillShow);
    Keyboard.addListener("keyboardWillHide", this.keyboardWillHide);
  }

  componentWillUnmount() {
    Keyboard.removeListener("keyboardWillShow", this.keyboardWillShow);
    Keyboard.removeListener("keyboardWillHide", this.keyboardWillHide);
  }

  componentDidMount() {
    Animated.spring(this.state.opacity, { duration: 50, toValue: 1 }).start();
  }

  keyboardWillShow(e) {
    let newSize = Dimensions.get("window").height - e.endCoordinates.height;
    this.setState({ visibleHeight: newSize });
  }

  keyboardWillHide(e) {
    this.setState({
      visibleHeight: Dimensions.get("window").height
    });
  }

  render() {
    let { opacity, visibleHeight } = this.state;
    let { onStop } = this.props;

    return (
      <Modal animationType={"fade"} transparent={true} onRequestClose={onStop}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          scrollEnabled={false}
          ref="_scrollView"
          style={styles.keyboardViewWrapper}
          contentContainerStyle={[
            styles.keyboardContainer,
            { height: visibleHeight }
          ]}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={e => {
              this.props.onStop();
              dismissKeyboard();
            }}
          />

          {this.props.children}
        </ScrollView>
      </Modal>
    );
  }
}

KeyboardView.propTypes = {
  onStop: PropTypes.func.isRequired
};

module.exports = KeyboardView;
