import React, { Component } from 'react';
import { View, Text, TextInput, Button, AsyncStorage, Alert, Picker, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import GlobalStyles from '../classes/Styles';
const MemberController = require('../controllers/MemberController');
const Member = require('../classes/Member');
const TaskController = require('../controllers/TaskController');
const Task = require('../classes/Task');
const _ = require('lodash');
const Item = Picker.Item;
const TaskCtrl = new TaskController();
const MemberCtrl = new MemberController();

export default class TaskPage extends Component {
  constructor () {
    super();

    this.state = {
      title: '',
      content: '',
      assignedTo: '',
      color: ''
    };
    MemberCtrl.get().then( (members) => {
      this.state.members = members;
      this.forceUpdate();
    });

  }

  onValueChange = (key: string, value: string) => {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  };

  createNewTask = () => {
    let newTask = new Task(this.state.key, this.state.title, this.state.content, 'open', this.state.memberId);
    
    TaskCtrl.create(newTask).then( () => {
      Actions.Tasks();
    })
  }

  componentWillMount() {
    if (this.props.task) {
      let newState = {
        key: this.props.task.key,
        title: this.props.task.title,
        content: this.props.task.content,
        status: this.props.task.status,
        memberId: this.props.task.memberId,
      };
      this.setState(newState);
      // this.state = newState;
    }
  }
  
  render() {
    return (
      <View style={GlobalStyles.firstLevelContainer}>
        <View style={{marginBottom: 30}}>
          <Text>Title</Text>
          <TextInput
            ref={'title'}
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
          />
        </View>

        <View style={{}}>
          <Text>Content</Text>
          <TextInput
            ref={'content'}
            multiline={true}
            style={{
              // height: 200
            }}
            onChangeText={(content) => this.setState({content})}
            value={this.state.content}
          />
        </View>

        <Picker
          selectedValue={this.state.memberId}
          onValueChange={this.onValueChange.bind(this, 'memberId')}
          mode="dropdown">
          {
            _.map(this.state.members, (mem) => {
              return <Item key={mem.key} label={mem.firstName} value={mem.key}/>
            })
          }

        </Picker>


        <View>
        
        </View>

        <View style={{marginTop: 50, flexDirection: 'row'}}>
          <Button title="Update" style={{flex: 1}} onPress={() => this.createNewTask()} >Update</Button>
          <View style={{flex: 1, width: 20}}></View>
          <Button title="Back" style={{flex: 1}} onPress={Actions.Tasks}>Cancel</Button>
        </View>
      </View>
    )
  }
}