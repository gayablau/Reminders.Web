import React from "react";
import { Dispatch, SetStateAction } from "react";
import { Reminder } from "../../Types/Reminder";

const reminders: Reminder[] = [];
type RemindersContextType = {
  reminders: Reminder[];
  setReminders: Dispatch<SetStateAction<Reminder[]>>;
};

let initialReminders: RemindersContextType = {
  reminders: reminders,
  setReminders: () => null,
};
export const RemindersContext = React.createContext(initialReminders);
