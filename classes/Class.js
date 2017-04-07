import React, { Component } from 'react';

class Class {
  key;
  assignedTo;
  title;
  content;
  constructor(member) {
    this.key = member.key;
    this.assignedTo = member.assignedTo || null;
    this.title = member.title || 'Task title';
    this.content = member.content || 'Task Content';
  };
}
module.exports = Class;