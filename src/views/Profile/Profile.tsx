import { useContext, useState } from "react";
import { Tile, Button, Icon, TextInput } from "@rocket.chat/fuselage";
import "@rocket.chat/icons/dist/rocketchat.css";
import { UserContext } from "../../contexts/user/LoggedInUser";
import { useHistory } from "react-router-dom";
import useInput from "../../hooks/useInput";
import useProfileValidation from "./useProfileValidation";

export default function Profile() {
  const { user } = useContext(UserContext);
  const [username, setUsername] = useInput(user.username);
  const { handleChangeUsername } = useContext(UserContext);
  const history = useHistory();
  const goToReminders = () => history.push("/reminders");
  const { profileValid, setUsernameValid } = useProfileValidation(
    username as string
  );
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <Tile borderRadius="1vh" position="absolute" marginBlockStart="20vh">
      <Icon
        display="flex"
        alignItems="start"
        style={{ WebkitTransform: "scaleX(-1)" }}
        transform="scaleX(-1)"
        name="arrow-back"
        onClick={goToReminders}
      ></Icon>
      <h1>פרטי משתמש</h1>
      <TextInput
        className="input-box"
        placeholder="שם משתמש"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setUsername(e);
          setUsernameValid(e.target.value);
        }}
        value={username}
      />
      {errorMessage && <p> {errorMessage} </p>}
      <Button
        marginBlockStart="10px"
        alignSelf="center"
        primary
        disabled={!profileValid}
        onClick={() =>
          handleChangeUsername(username, goToReminders, () => {
            setErrorMessage("Error changing username");
          })
        }
      >
        שמור
      </Button>
    </Tile>
  );
}
