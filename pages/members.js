import React, { Component } from 'react';
import { View, Text, TextInput, Button, AsyncStorage, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import GlobalStyles from '../classes/Styles';
const MemberController = require('../controllers/MemberController');
const Member = require('../classes/Member');
const _ = require('lodash');

export default class MembersPage extends Component {
  constructor () {
    super();
    this.state = {
      members: [],
      newMemberName: ''
    }
    const member = new Member(0, 'aaa', 'bbb');
    
    const Mem = new MemberController();
   
    Mem.get().then( (value) => {
      this.state.members = value;
      this.forceUpdate();
    });


    // Alert.alert(this.state.test, '', [], {});
    this.addMember = (member) => {
      let maxId = 0;
      if (this.state.members.length > 0) {
        maxId = _.maxBy(this.state.members, (mem) => {
          return Number(mem.key);
        }).key
      }
      let mem = new Member(1+maxId, this.state.newMemberName || 'Unnamed', 'USER');
      this.state.members.push(mem);
      Mem.updateMembers(this.state.members).then( () => {
        this.state.newMemberName = '';
        this.forceUpdate();
      });
    }

    console.log(this.state.members);
    this.removeMember = (member) => {
      _.remove(this.state.members, (mem) => {
        console.log(mem);
        return member.key == mem.key;
      });
      // this.forceUpdate();
      Mem.updateMembers(this.state.members).then( () => {
        this.forceUpdate();
      });
    }
  }
  render() {
    
    let changePage = (member) => Actions.Profile({member: member});
    return (
      <View style={GlobalStyles.firstLevelContainer}>
        <View style={{
                      marginBottom: 10, 
                      flexDirection: 'row', 
                      alignItems: 'center'
                    }}>
          <Text>Members</Text>
          <View style={{flex: 1}}></View>
          <Button onPress={Actions.Member} title="Add New Member">Add New</Button>
        </View>
        <ScrollView>
        {
          _.map(this.state.members, (member) => {
            return <TouchableOpacity key={member.key} style={{flexDirection: 'row', marginBottom: 15}} onPress={() => Actions.Member({member: member})}>
              <View style={{
                            width: 48, 
                            height: 48, 
                            backgroundColor: '#dddddd',
                            borderRadius: 50,
                            marginRight: 15,
                          }}></View>
              <View style={{
                            flex: 1, 
                            flexDirection: 'column', 
                            justifyContent: 'center'
                          }}

                    >
                <Text>{member.firstName} {member.lastName}</Text>
                <Text>{member.email}</Text>
              </View>
              <View>
                <Icon onPress={ () => this.removeMember(member)} name="remove" size={24} color="red" />
              </View>
            </TouchableOpacity>
          })
        }
        </ScrollView>
      </View>
    )
  }
}