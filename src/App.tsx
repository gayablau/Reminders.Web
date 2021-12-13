import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import "@rocket.chat/icons/dist/rocketchat.css";
import Login from "./views/Login/Login";
import Reminders from "./views/Home/RemindersList";
import Profile from "./views/Profile/Profile";
import { useHistory } from "react-router-dom";
import RemindersProvider from "./contexts/reminders/RemindersProvider"

import { SocketContext, socket } from "./contexts/socket/SocketContext";
import { UserContext } from "./contexts/user/LoggedInUser";
import { User } from "./contexts/user/LoggedInUser";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  //const loggedInUser = useContext(LoggedInUserContext);
  const {isLoggedIn} = useContext(UserContext);
  //let connectedUser : User = ["123a", "2גאיה"]

  const history = useHistory();

  // function login(newUser : User) {
  //   setUser(newUser);
  // };

  // function logout() {
  //   setUser(['','']);
  // };

  useEffect(() => {
    const goToLogin = () => history.push("/");
    const goToReminders = () => history.push("/reminders");
    if (isLoggedIn()) {
      goToReminders();
    } else {
      goToLogin();
    }
  }, [isLoggedIn, history]);

  return (
    <div className="App">
      <body>
        <Route exact path="/" component={Login} />
        <RemindersProvider>
        <Route path="/reminders" component={Reminders} />
        <Route path="/profile" component={Profile} />
        </RemindersProvider>
      </body>
    </div>
  );
}
