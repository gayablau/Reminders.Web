import React, { useState } from "react";

export const useReminderInput = (
  initialValue: string | number
): [string | number, (e: React.ChangeEvent<HTMLInputElement>) => void, React.Dispatch<React.SetStateAction<string | number>>] => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.currentTarget.value);
  return [value, handleChange, setValue];
};

export default useReminderInput;
