import React, { Component } from "react";

import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Platform,
  BackHandler
} from "react-native";

import routes from "enlist/app/routes";
import styles from "enlist/app/styles";

let backButton = require("enlist/app/images/back-light.png");

class Header extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (Platform.OS === "android") {
      const { onBack } = this.props;
      if (!onBack) return;

      this.backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBack.bind(this)
      );
    }
  }

  render() {
    let { label } = this.props;

    return (
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Text style={styles.headerText}>{label}</Text>
        </View>

        <View style={styles.headerButtonContainer}>
          {this.renderBackButton()}
        </View>
      </View>
    );
  }

  renderBackButton() {
    let { onBack } = this.props;

    if (onBack) {
      return (
        <TouchableOpacity style={styles.headerBackBtn} onPress={onBack}>
          <Image style={{ height: 11, width: 15 }} source={backButton} />
        </TouchableOpacity>
      );
    }
  }
}

module.exports = Header;
