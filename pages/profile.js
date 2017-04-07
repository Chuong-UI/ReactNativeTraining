import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Profile extends Component {
  render() {
    return (
      <View style={{margin: 128}}>
        <Text onPress={Actions.Home}>This is {this.props.member.name}!</Text>
      </View>
    )
  }
}