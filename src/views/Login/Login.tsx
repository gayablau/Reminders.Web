import React, { useState, useContext, useEffect } from 'react';
import useUserInput from '../../hooks/useUserInput';
import './Login.css';
import { Tile, InputBox, Button, Icon, TextInput, PasswordInput } from "@rocket.chat/fuselage";
import '@rocket.chat/icons/dist/rocketchat.css'
import logo from './logo.jpg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  withRouter
} from "react-router-dom";
import { UserContext } from '../../contexts/user/LoggedInUser';

export default function Login() {
  const history = useHistory();
  const goToReminders = () => history.push('/reminders');
  const [username, setUsername] = useUserInput("")
  const [password, setPassword] = useUserInput("")
  const { user, handleLogin, isLoggedIn } = useContext(UserContext)

  const goToLogin = () => history.push('/');

  // useEffect(() => {
  //     const goToLogin = () => history.push('/');
  //     const goToReminders = () => history.push('/reminders');
  //     if (isLoggedIn()) {
  //       goToReminders()
  //     }
  //   }, [user, isLoggedIn, history]);

  return (
    <div className="login">
      <img src={logo} className="App-logo" alt="logo" />
      <Tile borderRadius="1vh">
        <form className="login-form">
            <TextInput mb="x16" 
            value={username} 
            onChange={setUsername} 
            className="input-box" 
            placeholder='שם משתמש' />
            <PasswordInput value={password} 
            onChange={setPassword} 
            className="input-box" 
            placeholder='סיסמא' />
          <Button mb="x16" 
          onClick={() => handleLogin(username, password, goToReminders)} 
          primary>התחבר</Button>
        </form>
      </Tile>
    </div>
  );
}



