import React, { useState, useContext, useEffect } from "react";
import { Reminder } from "../Types/ReminderType";
import { SocketContext } from "../contexts/socket/SocketContext";
import { useSocket } from "./useSocket";
import { UserContext } from "../contexts/user/LoggedInUser";
import { RemindersContext } from "../contexts/reminders/RemindersContext";


const remindersState: Reminder[] = [];

export const useReminders = (): Reminder[] => {
  const { socket } = useSocket();
  const [reminders, setReminders] = useState(remindersState);

  useEffect(() => {
      socket.once("OnGetAllReminders", (remindersList) => {
        setReminders(remindersList);
      });
      socket.emit("getAllRemindersNoArgs");

      socket.on("onCreateReminder", (reminder) => {
        const remToAdd = reminder as Reminder;
        setReminders((reminders) => [...reminders, remToAdd]);
      });

      socket.on("onDeleteReminder", (reminder) => {
        const remToDelete = reminder as Reminder;
        setReminders((reminders) =>
          reminders.filter((item) => item.id !== remToDelete.id)
        );
      });

      socket.on("onEditReminder", (reminder) => {
        const remToEdit = reminder as Reminder;
        setReminders((reminders) => [
          ...reminders.filter((item) => item.id !== remToEdit.id),
          remToEdit,
        ]);
      });

    return () => {
      socket.off("onCreateReminder");
      socket.off("onDeleteReminder");
      socket.off("onEditReminder");
      socket.off("OnGetAllReminders")
    };
  }, []);

  return reminders.sort((rem1, rem2) => {
    return rem1.createdAt - rem2.createdAt;
  });
};

export default useReminders;
