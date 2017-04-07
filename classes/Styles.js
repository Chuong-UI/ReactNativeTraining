import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 70,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15
  },
  firstLevelContainer: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom:20
  }
});
module.exports = GlobalStyles;