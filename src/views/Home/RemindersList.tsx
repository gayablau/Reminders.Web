import { useState, useContext } from "react";
import "./RemindersList.css";
import { Tile, Button, Box, ButtonGroup } from "@rocket.chat/fuselage";
import "@rocket.chat/icons/dist/rocketchat.css";
import { UserContext } from "../../../src/contexts/user/LoggedInUser";
import { RemindersTable } from "./RemindersTable/RemindersTable";
import ReminderDetails from "./ReminderDetails/ReminderDetails";
import { RemindersContext } from "../../contexts/reminders/RemindersContext";
import { Link } from "react-router-dom";
import { Reminder } from "../../Types/Reminder";

export default function Reminders() {
  const { reminders } = useContext(RemindersContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user, handleLogout } = useContext(UserContext);
  const [openedReminder, setOpenedReminder] = useState<Reminder["id"]>("");

  function checkReminderId(rem: Reminder) {
    return rem.id === openedReminder;
  }

  const findReminderById = () => {
    return reminders.find(checkReminderId);
  };

  const openModalEdit = (reminderId: Reminder["id"]) => {
    setOpenedReminder(reminderId);
    setModalIsOpen(true);
  };

  const openModalAdd = () => {
    setOpenedReminder("");
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Tile className="screen-box">
        <Box paddingBlockEnd="5px" is="h2">
          שלום, <Link to="/profile">{user.username}</Link>
        </Box>
        <RemindersTable openModal={openModalEdit} />
        <ButtonGroup
          align="center"
          display="flex"
          justifyContent="space-around"
        >
          <Button onClick={handleLogout} primary danger>
            התנתק
          </Button>
          <Button onClick={openModalAdd} primary>
            הוסף התראה
          </Button>
        </ButtonGroup>
      </Tile>
      <>
        {modalIsOpen ? (
          <ReminderDetails
            reminder={findReminderById()}
            handleClose={closeModal}
          />
        ) : null}
      </>
    </>
  );
}
