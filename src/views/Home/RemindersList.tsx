import React, { useState, useContext, useEffect } from "react";
import "./RemindersList.css";
import {
  Tile,
  InputBox,
  Button,
  Icon,
  Table,
  Modal,
  ButtonGroup,
  TextInput,
} from "@rocket.chat/fuselage";
import "@rocket.chat/icons/dist/rocketchat.css";
import { SocketContext } from "../../../src/contexts/socket/SocketContext";
import { UserContext } from "../../../src/contexts/user/LoggedInUser";
import {RemindersTable, MemoizedTable} from "./RemindersTable/RemindersTable";
import ReminderDetails from "./ReminderDetails/ReminderDetails";
import { useModal } from "../../../src/hooks/useModal";
import { useReminders } from "../../hooks/useReminders";
import { RemindersContext } from "../../contexts/reminders/RemindersContext";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import Profile from "../../views/Profile/Profile";
import { Reminder } from "../../Types/ReminderType";

export default function Reminders() {
  const { reminders } = useContext(RemindersContext);
  const [ modalIsOpen, setModalIsOpen]  = useState(false);
  const { user, handleLogout } = useContext(UserContext);
  const [openedReminder, setOpenedReminder] = useState("");

  function checkReminderId(rem: Reminder) {
    return rem.id === openedReminder;
  }

  const findReminderById = (id: Reminder["id"]) => {
    return reminders.find(checkReminderId);
  };

  const history = useHistory();
  const goToProfile = () => history.push("/profile");
  const goToLogin = () => history.push("/");

  return (
    <>
      <div className="reminders-list">
        <Tile borderRadius="1vh">
          <div className="tile-header">
            <h2>
              <Link to="/profile">{user.username}</Link>
            </h2>
            <h2>שלום</h2>
          </div>
            <MemoizedTable
              openModal={(reminderId: Reminder["id"]) => {
                setOpenedReminder(reminderId);
                setModalIsOpen(true);
              }}
            />
          <div className="buttons">
            <Button
              onClick={() => {
                setOpenedReminder("");
                setModalIsOpen(true);
              }}
              primary
            >
              הוסף התראה
            </Button>
            <Button onClick={() => handleLogout()} primary danger>
              התנתק
            </Button>
          </div>
        </Tile>
      </div>
      <div className="reminder-details-modal">
        {modalIsOpen ? (
          <ReminderDetails
            reminder={findReminderById(openedReminder ?? -1)}
            handleClose={() => setModalIsOpen(false)}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
