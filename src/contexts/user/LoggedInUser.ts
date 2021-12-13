import React from "react";

export type User = { userId: string; username: string };
type UserContextType = {
  user: User;
  handleLogin: (
    username: string,
    password: string,
    onSuccess: () => void,
    onFailure: () => void
  ) => void;
  isLoggedIn: () => boolean;
  handleLogout: () => void;
  handleChangeUsername: (
    newUsername: string,
    onSuccess: () => void,
    onFailure: () => void
  ) => void;
};
let connectedUser: UserContextType = {
  user: { userId: "", username: "" },
  handleLogin: () => null,
  isLoggedIn: () => false,
  handleLogout: () => null,
  handleChangeUsername: () => null,
};
export const UserContext = React.createContext(connectedUser);
