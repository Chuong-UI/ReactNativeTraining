import React, { Component } from 'react';

class Member {
  key;
  firstName;
  lastName;
  email;
  role;
  avatar;
  constructor(member) {
    this.key = member.key;
    this.firstName = member.firstName || 'First';
    this.lastName = member.lastName || 'Last';
    this.email = member.email || 'test@test.com';
    this.role = member.role || 'USER';
    this.avatar = member.avatar || ''
  };
}
module.exports = Member;