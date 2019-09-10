import React, { Component } from "react";
import Raven from "raven-js";
import RavenReactNative from "raven-js/plugins/react-native";

import { sentryDsn } from "enlist/app/config";
import Package from "enlist/package.json";

import { AppRegistry, Platform, StatusBar, View } from "react-native";

import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import Enlist from "./app/enlist";

RavenReactNative(Raven);
Raven.config(sentryDsn, {
  release: Package.version,
  serverName: Platform.IOS
}).install();

class enlist extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar barStyle="default" />
        <ActionSheetProvider>
          <Enlist />
        </ActionSheetProvider>
      </View>
    );
  }
}

AppRegistry.registerComponent("enlist", () => enlist);
