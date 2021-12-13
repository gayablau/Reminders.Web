import { useState, useEffect } from "react";
import { Reminder } from "../../../Types/ReminderType";

export const useModalTitle = (reminder: Reminder | undefined) => {
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    if (reminder !== undefined) {
      setModalTitle("ערוך התראה");
    } else {
      setModalTitle("הוסף התראה");
    }
  }, [reminder]);

  return [modalTitle, setModalTitle];
};

export default useModalTitle;
