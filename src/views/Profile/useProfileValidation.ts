import { useState, useEffect, useMemo } from "react";

export const useProfileValidation = (initialUsername: string) => {
  const [profileValid, setProfileValid] = useState(false);
  const [usernameValid, setUsernameValid] = useState(initialUsername);

  const validHeaderInput = useMemo((): boolean => {
    return usernameValid.length > 0;
  }, [usernameValid]);

  useEffect(() => {
    setProfileValid(validHeaderInput);
  }, [validHeaderInput]);

  return { profileValid, setUsernameValid };
};

export default useProfileValidation;
