import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
const _ = require('lodash');

class MemberController {
  constructor() {
    // super();
  };
  maxId = 0;
  getMaxId = (members) => {
    let latestMember = _.maxBy(members, (mem) => {
      return mem.key;
    })
    let maxId = latestMember && latestMember.key || 0;
    return maxId;
  };
  updateMembers = (members) => {
    return AsyncStorage.setItem("members", JSON.stringify(members));
  };
  get = () => {
    return AsyncStorage.getItem('members').then( (value) => {
      if (value && ''+value != 'undefined') {
        return JSON.parse(value);
      }
      return [];
    });
  };
  create = (member) => {
    return this.get().then((members) => {
      if (member.key) {
        members = _.map(members, (t) => {
          if (t.key == member.key) {
            t = member;
          }
          return t;
        })
      }
      else {
        member.key = this.getMaxId(members)+1;
        members.push(member);
      }
      return this.updateMembers(members);
    })
  }
}
module.exports = MemberController;