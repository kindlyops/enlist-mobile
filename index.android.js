import React, { Component } from "react";
import Raven from "raven-js";
import RavenReactNative from "raven-js/plugins/react-native";

import { sentryDsn } from "enlist/app/config";
import Package from "enlist/package.json";

import { COLOR, ThemeProvider } from "react-native-material-ui";

const uiTheme = {
  palette: {
    primaryColor: COLOR.blue600
  },
  typography: {
    fontFamily: "Roboto",
    fontSize: 10
  }
};

import { AppRegistry, Platform, StatusBar, View } from "react-native";

import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import Enlist from "./app/enlist";

RavenReactNative(Raven);
Raven.config(sentryDsn, {
  release: Package.version,
  serverName: Platform.android
}).install();

class enlist extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar barStyle="default" />
        <ActionSheetProvider>
          <ThemeProvider uiTheme={uiTheme}>
            <Enlist />
          </ThemeProvider>
        </ActionSheetProvider>
      </View>
    );
  }
}

AppRegistry.registerComponent("enlist", () => enlist);
