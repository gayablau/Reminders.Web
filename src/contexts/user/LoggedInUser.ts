import React from 'react';

type User = [String, String]
let connectedUser : User = ['', '']
export const LoggedInUserContext = React.createContext(connectedUser);
