import React, { Component } from "react";
import { connect } from "react-redux";
import { fromJS, List } from "immutable";
import PropTypes from "prop-types";

import { Platform, Dimensions } from "react-native";
import dismissKeyboard from "react-native-dismiss-keyboard";

import {
  ActivityIndicator,
  StatusBar,
  TextInput,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  ListView,
  Image,
  LayoutAnimation
} from "react-native";

import styles from "enlist/app/styles/search";
import KeyboardView from "enlist/app/components/base/keyboardView";
import { animations } from "enlist/app/utils";
import Slide from "enlist/app/components/animations/slide";

import { api } from "enlist/app/utils";
import { search } from "enlist/app/actions";
import { debounce } from "lodash";
import pluralise from "pluralise";

let searchImg = require("enlist/app/images/search.png");
let closeImg = require("enlist/app/images/close.png");

class Search extends KeyboardView {
  constructor(props) {
    super(props);
  }

  search(term) {
    return this.props.dispatch(search(term));
  }

  render() {
    let { opacity, visibleHeight } = this.state;
    let { results, isLoading, onStop } = this.props;

    return (
      <Modal animationType={"fade"} transparent={true} onRequestClose={onStop}>
        <StatusBar hidden={true} />

        <ScrollView
          scrollEnabled={false}
          ref="_scrollView"
          style={styles.searchWrapper}
          contentContainerStyle={[
            styles.searchContainer,
            { height: visibleHeight - 20 }
          ]}
        >
          <Slide axis="Y" offset={20}>
            <View style={styles.searchInputWrapper}>
              <Image style={{ height: 16, width: 16 }} source={searchImg} />

              <TextInput
                style={styles.searchInput}
                autoFocus={true}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="search"
                keyboardType="default"
                placeholder="Type here to search..."
                placeholderTextColor="#B8BDC7"
                onChangeText={debounce(this.search.bind(this), 500)}
              />

              {this.renderCloseBtn()}
            </View>
          </Slide>

          {isLoading ? this.renderLoading() : this.renderApplications(results)}

          <TouchableOpacity
            onPress={e => {
              this.props.onStop();
              dismissKeyboard();
            }}
          />
        </ScrollView>
      </Modal>
    );
  }

  renderLoading() {
    return (
      <View style={{ flex: 1, padding: 25 }}>
        <ActivityIndicator color="gray" size="small" animating={true} />
      </View>
    );
  }

  renderCloseBtn() {
    const { onStop } = this.props;

    if (Platform.OS === "ios") {
      return (
        <TouchableOpacity
          onPress={() => {
            onStop();
            dismissKeyboard();
          }}
          style={styles.searchCloseBtn}
        >
          <Image style={{ height: 10, width: 10 }} source={closeImg} />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }

  renderApplications(applications) {
    let { hasLoaded } = this.props;

    let source = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    let data = source.cloneWithRows(applications);

    if (applications && applications.length > 0) {
      let word = pluralise(applications.length, "application");

      return (
        <View style={{ flex: 1 }}>
          <View style={{ padding: 15, paddingBottom: 5 }}>
            <Text style={styles.searchHeaderText}>
              {`${applications.length} ${word}`}
            </Text>
          </View>

          <ListView
            dataSource={data}
            renderRow={this.renderApplication.bind(this)}
            style={styles.searchResults}
          />
        </View>
      );
    } else if (hasLoaded) {
      return (
        <View style={{ flex: 1, padding: 25 }}>
          <Text>Nothing found.</Text>
        </View>
      );
    }
  }

  renderApplication(application) {
    const {
      id,
      firstName,
      lastName,
      email,
      job,
      currentStage,
      tags
    } = application;
    const fullName = (firstName, lastName) => `${firstName} ${lastName}`;

    return (
      <TouchableOpacity
        key={application.id}
        style={styles.searchResultItem}
        onPress={() => {
          this.props.dispatch({
            type: "fetchApplication"
          });

          this.props.dispatch({
            type: "goTo",
            route: "application",
            props: {
              applicationId: id
            }
          });
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>
            {fullName(firstName, lastName)}
          </Text>
        </View>

        <View style={{ marginTop: 3, flexDirection: "row" }}>
          <Text style={styles.metadata}>{job.title}</Text>

          <Text style={{ marginLeft: 5, marginRight: 5 }}>·</Text>

          <Text style={styles.metadata}>{currentStage.name}</Text>
        </View>

        <View style={styles.tags}>
          {tags.map(tag => (
            <Text key={tag} style={styles.tag}>
              {" "}
              {tag}{" "}
            </Text>
          ))}
        </View>
      </TouchableOpacity>
    );
  }
}

Search.propTypes = {
  onStop: PropTypes.func.isRequired
};

module.exports = connect(state => {
  const {
    search: { results, isLoading, hasLoaded }
  } = state;

  return {
    results,
    isLoading,
    hasLoaded
  };
})(Search);
