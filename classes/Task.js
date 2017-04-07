import React, { Component } from 'react';

class Task {
  key;
  title;
  content;
  status;
  memberId;
  constructor(key, title, content, status, memberId) {
    this.key = key;
    this.title = title;
    this.content = content;
    this.status = status;
    this.memberId = memberId;
  };
}
module.exports = Task;