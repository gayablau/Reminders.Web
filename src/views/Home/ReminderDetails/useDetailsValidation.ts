import { useState, useEffect, useMemo } from "react";
import moment from "moment";

type DetailsForm = { header: string; time: string; date: string };

export const useDetailsValidation = (Input: DetailsForm) => {
  const [detailsValid, setDetailsValid] = useState(false);
  const [header, setHeaderValid] = useState(Input.header);
  const [time, setTimeValid] = useState(Input.time);
  const [date, setDateValid] = useState(Input.date);

  const validTimeInput = useMemo((): boolean => {
    return (
      moment().format("YYYY-MM-DD") === date &&
      (moment(time, "HH:mm").format("HH") < moment().format("HH") ||
        (moment(time, "HH:mm").format("HH") === moment().format("HH") &&
          moment(time, "HH:mm").format("mm") < moment().format("mm")))
    );
  }, [date, time]);

  const validHeaderInput = useMemo((): boolean => {
    console.log(header);
    return header.length > 0;
  }, [header]);

  useEffect(() => {
    setDetailsValid(!validTimeInput && validHeaderInput);
  }, [validTimeInput, validHeaderInput]);

  return { detailsValid, setHeaderValid, setTimeValid, setDateValid };
};

export default useDetailsValidation;
