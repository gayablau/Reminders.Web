import React, { useState, useContext } from 'react';
import './App.css';
import '@rocket.chat/icons/dist/rocketchat.css'
import Login from './Login';
import Reminders from './RemindersList'
import Profile from './Profile'

import {SocketContext, socket} from "./contexts/socket/SocketContext";
import {LoggedInUserContext} from "./contexts/user/LoggedInUser";

export default function App() {
  //const loggedInUser = useContext(LoggedInUserContext);

  return (
    <div className="App">
      <header>
      <SocketContext.Provider value={socket}>
        <Reminders/>
        </SocketContext.Provider>
      </header>
    </div>
  );
}
