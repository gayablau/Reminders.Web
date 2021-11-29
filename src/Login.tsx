import React, { useState, useContext } from 'react';
import './Login.css';
import { Tile, InputBox, Button, Icon } from "@rocket.chat/fuselage";
import '@rocket.chat/icons/dist/rocketchat.css'
import logo from './logo.jpg';
import {SocketContext} from "./contexts/socket/SocketContext";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  withRouter
} from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const goToReminders = () => history.push('/reminders');
  // const socket = useContext(SocketContext);

  // function TryToConnect() {
  //   socket.emit("")
  // }

  return (
    <div className="login">
      <img src={logo} className="App-logo" alt="logo" />
      <Tile>
        <form className="login-form">
          <div className="input">
            <InputBox className="input-box" placeholder='שם משתמש' type='text' />
          </div>
          <div className="input">
            <InputBox className="input-box" placeholder='סיסמא' type='password' />
          </div>
          <Button onClick={goToReminders} primary>התחבר</Button>
        </form>
      </Tile>
    </div>
  );
}



