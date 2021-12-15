import { useContext } from "react";
import { SocketContext } from "../contexts/socket/SocketContext";
import { Reminder } from "../Types/Reminder";

export const useSocket = () => {
  const socket = useContext(SocketContext);

  if (!socket) {
    throw Error("Cannot use socket outside of context");
  }

  const addReminder = (reminder: Reminder) => {
    socket.emit("createReminder", JSON.stringify(reminder));
  };

  const editReminder = (reminder: Reminder) => {
    socket.emit("editReminder", JSON.stringify(reminder));
  };

  const deleteReminder = (reminder: Reminder) => {
    socket.emit("deleteReminder", JSON.stringify(reminder));
  };

  return { socket, addReminder, editReminder, deleteReminder };
};
