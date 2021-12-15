import { useContext, useEffect, useState } from "react";
import "./Login.css";
import {
  Tile,
  Button,
  TextInput,
  PasswordInput,
  FieldGroup,
  Field,
} from "@rocket.chat/fuselage";
import "@rocket.chat/icons/dist/rocketchat.css";
import logo from "./logo.jpg";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/user/LoggedInUser";
import useInput from "../../hooks/useInput";

export default function Login() {
  const history = useHistory();
  const goToReminders = () => history.push("/reminders");
  const [username, setUsername] = useInput("");
  const [password, setPassword] = useInput("");
  const { handleLogin } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
  }, [username, password]);

  const onLoginFailed = () => setErrorMessage("Error login");

  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <Tile is="form" className="screen-box" w="35vw">
        <FieldGroup>
          <TextInput
            autoComplete="username"
            value={username}
            onChange={setUsername}
            placeholder="שם משתמש"
          />
          <PasswordInput
            autoComplete="current-password"
            value={password}
            onChange={setPassword}
            placeholder="סיסמא"
          />
          {errorMessage && <Field.Error> {errorMessage} </Field.Error>}
          <Button
            onClick={() =>
              handleLogin(username, password, goToReminders, onLoginFailed)
            }
            primary
          >
            התחבר
          </Button>
        </FieldGroup>
      </Tile>
    </>
  );
}
