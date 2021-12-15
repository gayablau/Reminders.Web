import { useContext, useState, useEffect } from "react";
import {
  Tile,
  Button,
  Icon,
  TextInput,
  Box,
  FieldGroup,
  Field,
} from "@rocket.chat/fuselage";
import "@rocket.chat/icons/dist/rocketchat.css";
import { UserContext } from "../../contexts/user/LoggedInUser";
import { useHistory } from "react-router-dom";
import useInput from "../../hooks/useInput";

export default function Profile() {
  const { user, handleChangeUsername } = useContext(UserContext);
  const [username, setUsernameInput, setUsername] = useInput(
    user.username,
    () => errorMessage && setErrorMessage("")
  );
  const history = useHistory();
  const goToReminders = () => history.push("/reminders");
  const [errorMessage, setErrorMessage] = useState("");

  const setError = () => {
    setErrorMessage("Error changing username");
  };

  useEffect(() => {
    setUsername(user.username);
  }, [user.username, setUsername]);

  return (
    <Tile className="screen-box">
      <Icon
        display="flex"
        alignItems="start"
        name="arrow-back"
        onClick={goToReminders}
      ></Icon>
      <Box display="flex" flexDirection="column" margin="10px">
        <Box is="h1" mbe="x16">
          פרטי משתמש
        </Box>
        <FieldGroup>
          <TextInput
            width="200px"
            alignSelf="center"
            className="input-box"
            placeholder="שם משתמש"
            onChange={setUsernameInput}
            value={username}
          />
          {errorMessage && (
            <Field.Error margin="5px"> {errorMessage} </Field.Error>
          )}
          <Button
            marginBlockStart="10px"
            alignSelf="center"
            primary
            disabled={!username.length || !!errorMessage}
            onClick={() =>
              handleChangeUsername(username, goToReminders, setError)
            }
          >
            שמור
          </Button>
        </FieldGroup>
      </Box>
    </Tile>
  );
}
