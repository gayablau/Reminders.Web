import { useState, useContext, useEffect } from "react";
import "./RemindersList.css";
import { Tile, Button, Box, ButtonGroup } from "@rocket.chat/fuselage";
import "@rocket.chat/icons/dist/rocketchat.css";
import { UserContext } from "../../../src/contexts/user/LoggedInUser";
import { MemoizedTable } from "./RemindersTable/RemindersTable";
import ReminderDetails from "./ReminderDetails/ReminderDetails";
import { RemindersContext } from "../../contexts/reminders/RemindersContext";
import { Link } from "react-router-dom";
import { Reminder } from "../../Types/ReminderType";

export default function Reminders() {
  const { reminders } = useContext(RemindersContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user, handleLogout } = useContext(UserContext);
  const [openedReminder, setOpenedReminder] = useState("");

  function checkReminderId(rem: Reminder) {
    return rem.id === openedReminder;
  }

  const findReminderById = (id: Reminder["id"]) => {
    return reminders.find(checkReminderId);
  };

  return (
    <>
      <Tile borderRadius="1vh" position="absolute" marginBlockStart="10vh">
        <Box className="tile-header">
          <h2>
            <Link to="/profile">{user.username}</Link>
          </h2>
          <h2>שלום</h2>
        </Box>
        <MemoizedTable
          openModal={(reminderId: Reminder["id"]) => {
            setOpenedReminder(reminderId);
            setModalIsOpen(true);
          }}
        />
        <ButtonGroup align="center">
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
        </ButtonGroup>
      </Tile>
      <>
        {modalIsOpen ? (
          <ReminderDetails
            reminder={findReminderById(openedReminder ?? -1)}
            handleClose={() => setModalIsOpen(false)}
          />
        ) : (
          <></>
        )}
      </>
    </>
  );
}
