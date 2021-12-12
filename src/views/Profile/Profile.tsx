import React, { useState, useContext, useEffect } from 'react';
import './Profile.css';
import { Tile, InputBox, Button, Icon, TextInput } from "@rocket.chat/fuselage";
import '@rocket.chat/icons/dist/rocketchat.css'
import { SocketContext } from "../../contexts/socket/SocketContext";
import { UserContext } from "../../contexts/user/LoggedInUser";
import { useHistory } from 'react-router-dom';
import useInput from '../../hooks/useUserInput';

export default function Profile() {
  const { user } = useContext(UserContext)
  const [username, setUsername] = useInput(user.username)
  const { handleChangeUsername } = useContext(UserContext)
  const history = useHistory();
  const goToReminders = () => history.push('/reminders');
  const [valid, setValid] = useState(false);

  useEffect(() => {
    function handleUserInput() {
      return username.toString().length > 0;
    }
    setValid(handleUserInput);
  }, [username]);

  return (
    <div className="profile">
      <Tile borderRadius="1vh">
        <div className="icon-back">
          <Icon name="arrow-back" onClick={goToReminders}></Icon>
        </div>
        <form className="profile-form">
          <div className="profile-header">
            <h1>פרטי משתמש</h1>
          </div>
          <div className="profile-input">
            <TextInput className="input-box" placeholder='שם משתמש' onChange={setUsername} value={username} />
          </div>
          <div className="profile-submit">
            <Button primary disabled={!valid} onClick={() => handleChangeUsername(username, goToReminders)}>שמור</Button>
          </div>
        </form>
      </Tile>
    </div>
  );
}



