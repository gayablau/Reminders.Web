import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSocket } from '../../hooks/useSocket';
import {User, UserContext} from './LoggedInUser';

const userState = {
    userId : '',
    username : ''
}

export default function UserProvider({ children } : PropsWithChildren<{}>) {
    const [user, setUser] = useState(userState);
    const {socket} = useSocket();
    const history = useHistory();

    useEffect(() => {

        const handleBackroundLogin = (userId: string, username: string) => {
            socket.once("userId", (userId) => {
                if(userId) {
                    loginInBackround({userId, username})
                    setUser({userId, username});
                }
            })
            socket.emit("connectUserInBackround", JSON.stringify({userId, username}));
        }

        const userId = localStorage.getItem('userId');
        const username = localStorage.getItem('username');

        if (userId !== null && username !== null) {
            handleBackroundLogin(userId, username)
        }
    }, [history, socket])

    const login = (user: User) => {
        localStorage.setItem('userId', user.userId)
        localStorage.setItem('username', user.username)
        setUser(prevState => ({
            ...prevState, ...user
        }))
    }

    const loginInBackround = (user: User) => {
        console.log(user)
        setUser(prevState => ({
            ...prevState, ...user
        }))
    }

    const changeUsername = (username: string) => {
        localStorage.setItem('username', username)
        setUser(prevState => ({
            ...prevState, username
        }))   
    }

    const handleChangeUsername = (newUsername : string, onSuccess: () => void, onFailure: () => void) => {
        socket.once("changeUsername", (isChanged) => {
            console.log(isChanged)
            if(isChanged) {
                changeUsername(newUsername)
                onSuccess()
            }
            else {
                onFailure()
            }
        })
        socket.emit("changeUsernameIfAble", newUsername);
    }

    const handleLogin = (username: string, password: string, onSuccess: () => void, onFailure: () => void) => {
        socket.once("userId", (userId) => {
            if (userId) {
                login({userId, username})
                onSuccess()
            }
            else {
                onFailure()
            }
        })
        socket.emit("connectUser", JSON.stringify({username, password}));
    }

    const handleLogout = () => {
        socket.once("onLogout", () => {
            logout()
        })
        socket.emit("logout");
    }

    const logout = () => {
        localStorage.removeItem('userId')
        localStorage.removeItem('username')
        setUser({
            userId : "",
            username : ""
        })
    }

    const isLoggedIn = () : boolean => {
        if (user.userId !== "") {
            return true
        }
        return false
    }


  return (
    <UserContext.Provider value={{user, handleLogin, handleLogout, handleChangeUsername, isLoggedIn}}>
      {children}
    </UserContext.Provider>
  );
}

