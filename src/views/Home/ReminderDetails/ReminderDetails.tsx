import React, { useState, useContext, useEffect, useCallback, useMemo } from "react";
import "../RemindersList.css";
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
import { useSocket } from "../../../hooks/useSocket";
import { useModalTitle } from "../../../hooks/useModalTitle";
import { useReminderInput } from "../../../hooks/useReminderInput";
import { Reminder } from "../../../Types/ReminderType";
import { UserContext } from "../../../contexts/user/LoggedInUser";
import { useDetailsValidation } from "./useDetailsValidation";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import moment from "moment";
import useReminder from "../../../hooks/useReminder";
import { v4 } from "uuid";

type ReminderDetailsProps = {
  reminder: Reminder | undefined;
  handleClose: () => void;
};

export default function ReminderDetails(props: ReminderDetailsProps) {
  const { addReminder, editReminder } = useSocket();
  const [header, setHeader] = useReminderInput(props.reminder?.header ?? "");
  const [description, setDescription] = useReminderInput(
    props.reminder?.description ?? ""
  );
  const [currentTime] = useReminderInput(moment().valueOf());
  const [time, setTime] = useReminderInput(
    moment(props.reminder?.time).format("HH:mm") ?? moment().format("HH:mm")
  );
  const [date, setDate] = useReminderInput(
    moment(props.reminder?.time).format("YYYY-MM-DD") ??
      moment().format("YYYY-MM-DD")
  );
  const [id, setId] = useReminderInput(props.reminder?.id ?? v4());
  const [createdAt, setCreatedAt] = useReminderInput(
    props.reminder?.createdAt ?? moment().valueOf()
  );
  const [modalTitle] = useModalTitle(props.reminder);
  const { user } = useContext(UserContext);
  const [valid, setValid] = useState(false);

  const validTimeInput = useMemo((): boolean => {
    return (
      moment().format("YYYY-MM-DD") === date &&
      (moment(time, "HH:mm").format("HH") < moment().format("HH") ||
        (moment(time, "HH:mm").format("HH") === moment().format("HH") &&
          moment(time, "HH:mm").format("mm") < moment().format("mm")))
    );
  },[date, time])

  const validHeaderInput = useMemo((): boolean => {
    return header.toString().length > 0;
  },[header])

  useEffect(() => {
    setValid(!validTimeInput && validHeaderInput)
  }, [date, time, header, validTimeInput, validHeaderInput]);

  const createReminderFromInput = () => {
    const newRem: Reminder = {
      id: id as string,
      header: header.toString(),
      description: description.toString(),
      createdAt: createdAt as number,
      time: moment(
        date.toString() + time.toString(),
        "YYYY-MM-DD HH:mm"
      ).valueOf(),
      user: user.userId,
    };
    console.log(newRem)
    return newRem;
  };

  const clickAdd = () => {
    if (props.reminder !== undefined) {
      editReminder(createReminderFromInput());
    } else {
      addReminder(createReminderFromInput());
    }
    props.handleClose();
  };

  return (
    <div>
      <Modal>
        <div className="reminder-details">
          <div className="modal-close-button">
            <Modal.Close onClick={props.handleClose} />
          </div>
          <Modal.Header>
            <div className="modal-title">
              <Modal.Title>{modalTitle}</Modal.Title>
            </div>
          </Modal.Header>
          <Modal.Content>
            <form className="reminder-details-form">
              <div className="input">
                <TextInput
                  value={header}
                  onChange={setHeader}
                  className="input-box"
                  placeholder="שם"
                />
              </div>
              <div className="input">
                <TextInput
                  value={description}
                  onChange={setDescription}
                  className="input-box"
                  placeholder="תיאור"
                />
              </div>
              <div className="input">
                <InputBox
                  value={date}
                  onChange={setDate}
                  className="input-box"
                  placeholder="תאריך"
                  type="date"
                  min={moment().format("YYYY-MM-DD")}
                />
              </div>
              <div className="input">
                <InputBox
                  value={time}
                  onChange={setTime}
                  className="input-box"
                  placeholder="שעה"
                  type="time"
                />
              </div>
            </form>
          </Modal.Content>
          <Modal.Footer>
            <Button onClick={clickAdd} disabled={!valid} primary>
              הוסף
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
}
