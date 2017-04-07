import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
const _ = require('lodash');

class TaskController {
  constructor() {
    // super();
  };
  maxId = 0;
  getMaxId = (tasks) => {
    let latestTask = _.maxBy(tasks, (task) => {
      return task.key;
    })
    let maxId = latestTask && latestTask.key || 0;
    return maxId;
  };
  updateTasks = (tasks) => {
    return AsyncStorage.setItem("tasks", JSON.stringify(tasks));
  };
  get = () => {
    return AsyncStorage.getItem('tasks').then( (value) => {
      if (value && ''+value != 'undefined') {
        return JSON.parse(value);
      }
      return [];
    });
  };
  create = (task) => {
    return this.get().then((tasks) => {
      if (task.key) {
        tasks = _.map(tasks, (t) => {
          if (t.key == task.key) {
            t = task;
          }
          return t;
        })
      }
      else {
        task.key = this.getMaxId(tasks)+1;
        tasks.push(task);
      }
      return this.updateTasks(tasks);
    })
  }
}
module.exports = TaskController;