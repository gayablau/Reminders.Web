import { useContext, useState } from "react";
import { Reminder } from "../../../Types/ReminderType";
import useInput from "../../../hooks/useInput";
import moment from "moment";
import { v4 } from "uuid";
import { UserContext } from "../../../contexts/user/LoggedInUser";

export const useReminder = (reminder: Reminder | undefined) => {
  const [header, setHeader] = useInput(reminder?.header ?? "");
  const [description, setDescription] = useInput(reminder?.description ?? "");
  const [time, setTime] = useInput(
    moment(reminder?.time).format("HH:mm") ?? moment().format("HH:mm")
  );
  const [date, setDate] = useInput(
    moment(reminder?.time).format("YYYY-MM-DD") ?? moment().format("YYYY-MM-DD")
  );
  const [id, setId] = useState(reminder?.id ?? v4());
  const [createdAt, setCreatedAt] = useState(
    reminder?.createdAt ?? moment().valueOf()
  );
  const { user } = useContext(UserContext);

  const createReminderFromInput = () => {
    const newRem: Reminder = {
      id: id as string,
      header: header,
      description: description,
      createdAt: createdAt as number,
      time: moment(
        date + time,
        "YYYY-MM-DD HH:mm"
      ).valueOf(),
      user: user.userId,
    };
    return newRem;
  };

  return {
    header,
    setHeader,
    description,
    setDescription,
    time,
    setTime,
    date,
    setDate,
    id,
    setId,
    createdAt,
    setCreatedAt,
    createReminderFromInput,
  };
};

export default useReminder;
