import { useContext, useState } from "react";
import "./Login.css";
import { Tile, Button, TextInput, PasswordInput } from "@rocket.chat/fuselage";
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

  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <Tile
        marginBlockStart="20px"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, 22%)",
        }}
        position="absolute"
        borderRadius="1vh"
      >
        <TextInput
          mb="x16"
          value={username}
          onChange={setUsername}
          className="input-box"
          placeholder="שם משתמש"
        />
        <PasswordInput
          value={password}
          onChange={setPassword}
          className="input-box"
          placeholder="סיסמא"
        />
        {errorMessage && <p> {errorMessage} </p>} 
        <Button
          mb="x16"
          onClick={() =>
            handleLogin(username, password, goToReminders, () => {
              setErrorMessage("Error login");
            })
          }
          primary
        >
          התחבר
        </Button>
      </Tile>
    </>
  );
}
