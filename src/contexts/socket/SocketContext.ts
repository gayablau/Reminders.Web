import { io } from "socket.io-client";
import React from 'react';
export const socket = io("http://localhost:3456/", {
    transports: ['websocket']
});

type SocketActions = {emit: typeof socket.emit, on: typeof socket.on, once: typeof socket.once, off: typeof socket.off} | undefined
export const SocketContext = React.createContext<SocketActions>(undefined);
