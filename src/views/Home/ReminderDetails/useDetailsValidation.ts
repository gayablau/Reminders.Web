import React, { useState, useEffect } from "react";
import moment from "moment";

type DetailsForm = { header: string; time: number };

export const useDetailsValidation = (initialValue: DetailsForm) => {
  const [detailsValid, setdetailsValid] = useState(false);
  const [headerValid, setHeaderValid] = useState(initialValue.header);
  const [timeValid, setTimeValid] = useState(initialValue.time);

  useEffect(() => {
    function handleUserInput() {
      console.log("before " + detailsValid)
      return (
        Math.round(moment().valueOf() / 1000 - timeValid / 1000) > 0 &&
        headerValid.length > 0
      );
    }
    setdetailsValid(handleUserInput);
    console.log("after " + detailsValid)
  }, [timeValid, headerValid]);

  return { detailsValid, setHeaderValid, setTimeValid };
};

export default useDetailsValidation;
