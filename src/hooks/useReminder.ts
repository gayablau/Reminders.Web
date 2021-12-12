import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import { Reminder } from "../Types/ReminderType";
import { useReminders } from "./useReminders";

const remindersState: Reminder = {
  id: v4(),
  createdAt: 0,
  description: "",
  header: "",
  time: 0,
  user: "",
};

export const useReminder = (id: Reminder['id']) => {
  const reminders = useReminders();
  const [reminder, setReminder] = useState<Reminder|undefined>(remindersState);

  useEffect(() => {
    function checkReminderId(rem: Reminder) {
      return rem.id === id;
    }
    const rem: Reminder | undefined = reminders.find(checkReminderId) 
    setReminder(rem);
  }, [reminders, id]);

  return { reminder };
};

export default useReminder;
