import React, { useState, useContext } from 'react';
import './App.css';
import '@rocket.chat/icons/dist/rocketchat.css'
import Login from './Login';
import Reminders from './RemindersList'
import Profile from './Profile'

import {SocketContext, socket} from "./contexts/socket/SocketContext";
import {UserContext} from "./contexts/user/LoggedInUser";

export default function App() {
  //const loggedInUser = useContext(LoggedInUserContext);
  const user = useContext(UserContext);

  return (
    <div className="App">
      <header>
      <UserContext.Provider value={user}>
        <Login  />
        </UserContext.Provider>
      </header>
    </div>
  );
}
