import { PropsWithChildren } from "react";
import { socket, SocketContext } from "./SocketContext";

export const SocketProvider = ({ children }: PropsWithChildren<{}>) => (
  <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
);

export default SocketProvider;
