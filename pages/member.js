import React, { Component } from 'react';
import { View, Text, TextInput, Button, AsyncStorage, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import GlobalStyles from '../classes/Styles';
const MemberController = require('../controllers/MemberController');
const Member = require('../classes/Member');
const _ = require('lodash');

export default class MemberPage extends Component {
  constructor () {
    super();
    const MemberCtrl = new MemberController();
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    };
    this.addNewMember = () => {
      let newMem = new Member(this.state);
      return MemberCtrl.create(newMem).then( () => {
        Actions.Members();
      });
    }
  }

  componentWillMount() {
    if (this.props.member) {
      this.state.key = this.props.member.key;
      this.state.firstName = this.props.member.firstName;
      this.state.lastName = this.props.member.lastName;
      this.state.email = this.props.member.email;
      // console.log(this.props.member);
    }
  }

  render() {
    
    return (
      <View style={GlobalStyles.firstLevelContainer}>
        <View style={{
                      flexDirection: 'column', 
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
          <View style={{
                        width: 200, 
                        height: 200, 
                        backgroundColor: '#dddddd',
                        borderRadius: 100,
                        marginBottom: 30
                      }}></View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text>First Name</Text>
            <TextInput
              ref={'firstName'}
              onChangeText={(firstName) => this.setState({firstName})}
              value={this.state.firstName}
            />
          </View>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text>Last Name</Text>
            <TextInput
              ref={'lastName'}
              onChangeText={(lastName) => this.setState({lastName})}
              value={this.state.lastName}
            />
          </View>
        </View>
        <View style={{marginTop: 50, flexDirection: 'column'}}>
          <Text>Email</Text>
          <TextInput
            ref={'email'}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
          />
        </View>

        <View style={{marginTop: 50, flexDirection: 'row'}}>
          <Button title="Update" style={{flex: 1}} onPress={this.addNewMember}>Update</Button>
          <View style={{flex: 1, width: 20}}></View>
          <Button title="Back" style={{flex: 1}} onPress={Actions.Members}>Cancel</Button>
        </View>
      </View>
    )
  }
}