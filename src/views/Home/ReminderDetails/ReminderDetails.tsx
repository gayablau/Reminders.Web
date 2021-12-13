import "../RemindersList.css";
import { Button, Modal } from "@rocket.chat/fuselage";
import "@rocket.chat/icons/dist/rocketchat.css";
import { useSocket } from "../../../hooks/useSocket";
import { useModalTitle } from "./useModalTitle";
import { Reminder } from "../../../Types/ReminderType";
import DetailsTextInput from "./DetailsTextInput";
import useReminder from "./useReminder";
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
    createReminderFromInput,
  } = useReminder(props.reminder);
  const [modalTitle] = useModalTitle(props.reminder);
  const { detailsValid, setHeaderValid, setTimeValid, setDateValid } =
    useDetailsValidation({
      header: header,
      time: time,
      date: date,
    });

  const clickAdd = () => {
    if (props.reminder !== undefined) {
      editReminder(createReminderFromInput());
    } else {
      addReminder(createReminderFromInput());
    }
    props.handleClose();
  };

  return (
    <Modal position="fixed" marginBlockStart="5vh" width="80vh">
      <Modal.Close
        style={{ marginRight: "5px", marginLeft: "auto", paddingTop: "5px" }}
        onClick={props.handleClose}
      />
      <Modal.Header>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Content>
        <DetailsTextInput
          value={header}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setHeader(e);
            setHeaderValid(e.target.value);
          }}
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDate(e);
            setDateValid(e.target.value);
          }}
          placeholder="תאריך"
          type="date"
        />
        <DetailsTextInput
          value={time}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTime(e);
            setTimeValid(e.target.value);
          }}
          placeholder="שעה"
          type="time"
        />
      </Modal.Content>
      <Modal.Footer>
        <Button onClick={clickAdd} disabled={!detailsValid} primary>
          הוסף
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
