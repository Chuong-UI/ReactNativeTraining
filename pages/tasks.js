import React, { Component } from 'react';
import { View, Text, TextInput, Button, AsyncStorage, Alert, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import GlobalStyles from '../classes/Styles';
const TaskController = require('../controllers/TaskController');
const TaskCtrl = new TaskController();
const _ = require('lodash');

export default class TasksPage extends Component {
  constructor () {
    super();
    this.state = {
      tasks: []
    }
    TaskCtrl.get().then( (tasks) => {
      this.state.tasks = tasks;
      this.forceUpdate();
    });

  }

  removeTask = function (task) {
    _.remove(this.state.tasks, (t) => {
      return t.key == task.key;
    });
    TaskCtrl.updateTasks(this.state.tasks).then( () => {
      this.forceUpdate();
    })
  }
  render() {
    
    return (
      <View style={GlobalStyles.firstLevelContainer}>
        <View style={{
                      marginBottom: 10, 
                      flexDirection: 'row', 
                      alignItems: 'center'
                    }}>
          <Text>Tasks</Text>
          <View style={{flex: 1}}></View>
          <Button onPress={Actions.Task} title="Add New Task">Add New</Button>
        </View>

        <ScrollView>
        {
          _.map(this.state.tasks, (task) => {
            return <TouchableOpacity 
              key={task.key} onPress={() => Actions.Task({task: task})}
              style = {{
                flexDirection: 'row'
              }}
              >
              <Text style={{fontSize: 20, flex: 1}}>{task.title}</Text>
              <Icon onPress={ () => this.removeTask(task)} name="remove" size={24} color="red" />
            </TouchableOpacity>
          })
        }
        </ScrollView>
      </View>
    )
  }
}