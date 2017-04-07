import React, { Component } from 'react';
import { View, Text, TextInput, Button, AsyncStorage, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
const MemberController = require('../controllers/MemberController');
const Member = require('../classes/Member');
const _ = require('lodash');

export default class Home extends Component {
  constructor () {
    super();
  }
  render() {
    return (
      <View>
        <Button title="Go to Members Page" onPress={Actions.Members}>Go to Members page</Button>
        <Button title="Go to Tasks Page" onPress={Actions.Tasks}>Go to Members page</Button>
      </View>
    )
  }
}