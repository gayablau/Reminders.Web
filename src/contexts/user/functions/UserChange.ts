import { User } from "../LoggedInUser";

export const logout = (setUser: (user: User) => void) => {
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
  setUser({
    userId: "",
    username: "",
  });
};

export const login = (user: User, setUser: (user: User) => void) => {
  localStorage.setItem("userId", user.userId);
  localStorage.setItem("username", user.username);
  setUser(user);
};

export const changeUsername = (user: User, setUser: (user: User) => void) => {
  localStorage.setItem("username", user.username);
  setUser(user);
};

export {};
