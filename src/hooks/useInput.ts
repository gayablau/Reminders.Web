import React, { useState } from "react";

export const useInput = (
  initialValue: string
): [string, (e: React.ChangeEvent<HTMLInputElement>) => void, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.currentTarget.value);
  return [value, handleChange, setValue];
};

export default useInput;
