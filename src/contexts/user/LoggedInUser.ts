import { createContext } from 'react';

type User = [userId : String, username : String]
let connectedUser : User = ["123a", "גאיה"]
export const UserContext = createContext(connectedUser);
