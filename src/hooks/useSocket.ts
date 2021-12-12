import { type } from "os";
import { useContext } from "react"
import { SocketContext } from "../contexts/socket/SocketContext"
import { Reminder } from "../Types/ReminderType";

export const useSocket = () => {
    const socket = useContext(SocketContext);

    const addReminder = (reminder : Reminder) => {
        socket?.emit("createReminder", JSON.stringify(reminder))
    }

    const editReminder = (reminder : Reminder) => {
        socket?.emit("editReminder", JSON.stringify(reminder))
    }

    const deleteReminder = (reminder : Reminder) => {
        socket?.emit("deleteReminder", JSON.stringify(reminder))
    }

    if(!socket) {
        throw Error("Cannot use socket outside of context");
    }

    return {socket, addReminder, editReminder, deleteReminder};
}