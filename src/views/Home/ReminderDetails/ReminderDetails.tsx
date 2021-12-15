import "../RemindersList.css";
import { Button, Modal, FieldGroup, Margins } from "@rocket.chat/fuselage";
import "@rocket.chat/icons/dist/rocketchat.css";
import { useSocket } from "../../../hooks/useSocket";
import { useModalTitle } from "./useModalTitle";
import { Reminder } from "../../../Types/Reminder";
import DetailsTextInput from "./DetailsTextInput";
import useReminder, { createReminderFromInput } from "./useReminder";
import useDetailsValidation from "./useDetailsValidation";

type ReminderDetailsProps = {
  reminder: Reminder | undefined;
  handleClose: () => void;
};

export default function ReminderDetails(props: ReminderDetailsProps) {
  const { addReminder, editReminder } = useSocket();
  const {
    header,
    setHeader,
    description,
    setDescription,
    time,
    setTime,
    date,
    setDate,
    createdAt,
    id,
    user,
  } = useReminder(props.reminder);
  const modalTitle = useModalTitle(props.reminder);
  const detailsValid = useDetailsValidation({
    header,
    time,
    date,
  });

  const onSubmit = () => {
    const reminder = createReminderFromInput({
      id,
      header,
      description,
      date,
      createdAt,
      time,
      user,
    });
    if (props.reminder !== undefined) {
      editReminder(reminder);
    } else {
      addReminder(reminder);
    }
    props.handleClose();
  };

  return (
    <Modal position="fixed" width="300px" zIndex="9999">
      <Modal.Close
        style={{ marginRight: "5px", marginLeft: "auto", paddingTop: "5px" }}
        onClick={props.handleClose}
      />
      <Modal.Header margin="10px">
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Content>
        <FieldGroup>
          <Margins blockEnd="x8">
            <DetailsTextInput
              value={header}
              onChange={setHeader}
              placeholder="שם"
              type="text"
            />
            <DetailsTextInput
              value={description}
              onChange={setDescription}
              placeholder="תיאור"
              type="text"
            />
            <DetailsTextInput
              value={date}
              onChange={setDate}
              placeholder="תאריך"
              type="date"
            />
            <DetailsTextInput
              value={time}
              onChange={setTime}
              placeholder="שעה"
              type="time"
            />
            <Button
              marginBlockStart="7px"
              marginBlockEnd="20px"
              onClick={onSubmit}
              disabled={!detailsValid}
              primary
            >
              שמור
            </Button>
          </Margins>
        </FieldGroup>
      </Modal.Content>
    </Modal>
  );
}
