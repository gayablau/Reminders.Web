import React, { useState, useContext } from 'react';
import './Login.css';
import { Tile, InputBox, Button, Icon } from "@rocket.chat/fuselage";
import '@rocket.chat/icons/dist/rocketchat.css'
import logo from './logo.jpg';
import {SocketContext} from "./contexts/socket/SocketContext";

export default function Login() {
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
          <Button primary>התחבר</Button>
        </form>
      </Tile>
    </div>
  );
}



