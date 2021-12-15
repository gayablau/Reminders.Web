import { useContext } from "react";
import { Reminder } from "../../../Types/Reminder";
import useInput from "../../../hooks/useInput";
import moment from "moment";
import { v4 } from "uuid";
import { UserContext } from "../../../contexts/user/LoggedInUser";

type ReminderData = Omit<Reminder, "time"> & {
  time: string;
  date: string;
};

export const createReminderFromInput = ({
  id,
  header,
  description,
  createdAt,
  time,
  user,
  date,
}: ReminderData) => {
  const newRem: Reminder = {
    id: id as string,
    header: header,
    description: description,
    createdAt: createdAt as number,
    time: moment(date + time, "YYYY-MM-DD HH:mm").valueOf(),
    user: user,
  };
  return newRem;
};

export const useReminder = (reminder?: Reminder) => {
  const [header, setHeader] = useInput(reminder?.header ?? "");
  const [description, setDescription] = useInput(reminder?.description ?? "");
  const [time, setTime] = useInput(
    moment(reminder?.time).format("HH:mm") ?? moment().format("HH:mm")
  );
  const [date, setDate] = useInput(
    moment(reminder?.time).format("YYYY-MM-DD") ?? moment().format("YYYY-MM-DD")
  );
  const id = reminder?.id ?? v4();
  const createdAt = reminder?.createdAt ?? moment().valueOf();
  const { user } = useContext(UserContext);

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
    createdAt,
    user: user.userId,
  };
};

export default useReminder;
