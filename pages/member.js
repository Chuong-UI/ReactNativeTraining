import React, { Component } from 'react';
import { View, Text, TextInput, Button, AsyncStorage, Alert, Image, TouchableOpacity } from 'react-native';

import { Actions } from 'react-native-router-flux';
import GlobalStyles from '../classes/Styles';
const ImagePicker = require('react-native-image-picker');
const MemberController = require('../controllers/MemberController');
const Member = require('../classes/Member');
const _ = require('lodash');

var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};


export default class MemberPage extends Component {
  constructor () {
    super();
    const MemberCtrl = new MemberController();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      avatar: {
        uri: 'https://lelakisihat.com/wp-content/uploads/2016/09/avatar.jpg'
      }
    };
    this.addNewMember = () => {
      let newMem = new Member(this.state);
      return MemberCtrl.create(newMem).then( () => {
        Actions.Members();
      });
    }

    this.options = {
      title: 'Select Avatar',
      customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };


    this.openCamera = () => {
      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          let source = { uri: response.uri };

          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };

          this.setState({
            avatar: source
          });
        }
      });
    }
  }

  componentWillMount() {
    if (this.props.member) {
      this.state.key = this.props.member.key;
      this.state.firstName = this.props.member.firstName;
      this.state.lastName = this.props.member.lastName;
      this.state.email = this.props.member.email;
      this.state.avatar = this.props.member.avatar;
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
                      }}>
                      <TouchableOpacity onPress={this.openCamera}>
                        <Image source={this.state.avatar} style={{width: 200, height: 200, borderRadius: 200}} />
                      </TouchableOpacity>
          </View>

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