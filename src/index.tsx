import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SocketProvider } from "./contexts/socket/SocketProvider";
import reportWebVitals from "./reportWebVitals";
import UserProvider from "./contexts/user/UserProvider";
import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <SocketProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </SocketProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
