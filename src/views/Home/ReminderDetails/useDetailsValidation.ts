import { useState, useEffect } from "react";
import moment from "moment";

type DetailsForm = { header: string; time: string; date: string };

const validateDateTime = (
  date: DetailsForm["date"],
  time: DetailsForm["time"]
) =>
  moment().format("YYYY-MM-DD") === date &&
  (moment(time, "HH:mm").format("HH") < moment().format("HH") ||
    (moment(time, "HH:mm").format("HH") === moment().format("HH") &&
      moment(time, "HH:mm").format("mm") < moment().format("mm")));

const validateHeader = (header: DetailsForm["header"]) => header.length > 0;

export const useDetailsValidation = ({ header, date, time }: DetailsForm) => {
  const [detailsValid, setDetailsValid] = useState(false);

  useEffect(() => {
    setDetailsValid(!validateDateTime(date, time) && validateHeader(header));
  }, [date, time, header]);

  return detailsValid;
};

export default useDetailsValidation;
