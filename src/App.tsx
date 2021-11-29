import React, { useState, useContext } from 'react';
import './App.css';
import '@rocket.chat/icons/dist/rocketchat.css'
import Login from './Login';
import Reminders from './RemindersList'
import Profile from './Profile'

import { SocketContext, socket } from "./contexts/socket/SocketContext";
import { UserContext } from "./contexts/user/LoggedInUser";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  //const loggedInUser = useContext(LoggedInUserContext);
  const user = useContext(UserContext);

  return (
    <div className="App">
      <header>
        <Router>
          <UserContext.Provider value={user}>
              <Route exact path="/" component={Login} />
              <Route path="/reminders" component={Reminders} />
              <Route path="/profile" component={Profile} />
          </UserContext.Provider>
        </Router>
      </header>
    </div>
  );
}
