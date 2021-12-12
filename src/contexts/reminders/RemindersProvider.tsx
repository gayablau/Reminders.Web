import { PropsWithChildren, useState, useEffect, useContext } from "react";
import { RemindersContext } from "./RemindersContext";
import { useReminders } from "../../hooks/useReminders";
import { useSocket } from "../../hooks/useSocket";
import { Reminder } from "../../Types/ReminderType";
import { UserContext } from "../user/LoggedInUser";
const remindersState: Reminder[] = [];

export const RemindersProvider = ({ children }: PropsWithChildren<{}>) => {
  const { socket } = useSocket();
  const { user } = useContext(UserContext)
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
      socket.off("OnGetAllReminders");
    };
  }, [socket, user]);

  const sortedReminders = reminders.sort((rem1, rem2) => {
    return rem1.createdAt - rem2.createdAt;
  });

  return (
    <RemindersContext.Provider
      value={{ reminders: sortedReminders, setReminders }}
    >
      {children}
    </RemindersContext.Provider>
  );
};

export default RemindersProvider;
