import React, { PropsWithChildren, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useSocket } from "../../hooks/useSocket";
import { User, UserContext } from "./LoggedInUser";
import { changeUsername, login, logout } from "./functions/UserChange";

const userState = {
  userId: "",
  username: "",
};

export default function UserProvider({ children }: PropsWithChildren<{}>) {
  const [user, setUser] = useState(userState);
  const { socket } = useSocket();
  const history = useHistory();

  useEffect(() => {
    const handleBackroundLogin = (userId: string) => {
      socket.once("username", (username) => {
        console.log("username " + username);
        if (username) {
          login({ userId, username }, setUser);
        }
      });
      socket.emit("connectUserInBackround", userId);
    };

    const userId = localStorage.getItem("userId");

    socket.on("onChangeUsername", (user) => {
      changeUsername(user, setUser);
    });

    if (userId !== null) {
      handleBackroundLogin(userId);
    }
  }, [history, socket]);

  const isLoggedIn = (): boolean => {
    if (user.userId !== "") {
      return true;
    }
    return false;
  };

  const handleChangeUsername = (
    newUsername: string,
    onSuccess: () => void,
    onFailure: () => void
  ) => {
    socket.once("changeUsername", (isChanged) => {
      console.log(isChanged);
      if (isChanged) {
        onSuccess();
      } else {
        onFailure();
      }
    });
    socket.emit("changeUsernameIfAble", newUsername);
  };

  const handleLogin = (
    username: string,
    password: string,
    onSuccess: () => void,
    onFailure: () => void
  ) => {
    socket.once("userId", (userId) => {
      if (userId) {
        login({ userId, username }, setUser);
        onSuccess();
      } else {
        onFailure();
      }
    });
    socket.emit("connectUser", JSON.stringify({ username, password }));
  };

  const handleLogout = () => {
    socket.once("onLogout", () => {
      logout(setUser);
    });
    socket.emit("logout");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        handleLogin,
        handleLogout,
        handleChangeUsername,
        isLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
