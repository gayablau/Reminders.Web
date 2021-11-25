import { io } from "socket.io-client";
import React from 'react';
export const socket = io("http://localhost:3456/");
export const SocketContext = React.createContext(socket);

socket.on("news", (data) => {
    console.log(data);
});

// with multiple arguments
socket.on("news", (arg1, arg2, arg3, arg4) => {
    // ...
});
// with callback
socket.on("news", (cb) => {
    cb(0);
});
