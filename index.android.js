import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';

import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';

import GlobalStyles from './classes/Styles';
import Home from './pages/home';
import Profile from './pages/profile';
import MembersPage from './pages/members';
import MemberPage from './pages/member';
import TasksPage from './pages/tasks';
import TaskPage from './pages/task';

export default class AwesomeProject extends Component {
  render() {
    return (
      <Router style={GlobalStyles.container}>
        <Scene key="root"  >
          <Scene key="Home" component={Home} title="Home"  initial={true} type={ActionConst.RESET} />
          <Scene key="Members" component={MembersPage} title="Members" backTitle="Home" onBack={() => {Actions.Home()}}>
          </Scene>
            <Scene key="Member" component={MemberPage} title="Member" backTitle="Members" onBack={Actions.Members}/>
          <Scene key="Tasks" component={TasksPage} title="Tasks" backTitle="Home" onBack={Actions.Home}/>
          <Scene key="Task" component={TaskPage} title="Task" backTitle="Tasks" onBack={Actions.Tasks}/>
          <Scene key="Profile" component={Profile} title="Profile" />
        </Scene>
      </Router>
    )
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);