import React, { useState, useContext } from "react";
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

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { Reminder } from "../../../Types/ReminderType";
import { type } from "os";
import moment from "moment";
import { MouseEventHandler } from "react";
import { useModal } from "../../../../src/hooks/useModal";
import ReminderDetails from "../ReminderDetails/ReminderDetails";

type RowProps = {
  reminder: Reminder;
  setModalIsOpenToTrueWithId: (id: Reminder["id"]) => void;
};

export function ReminderRow(props: RowProps) {
  const { deleteReminder } = useSocket();

  const milliSecToTime = (milliSec: number) => {
    return moment(milliSec).format("HH:mm");
  };

  const milliSecToDate = (milliSec: number) => {
    return moment(milliSec).format("DD/MM/YYYY");
  };

  return (
    <Table.Row
      onClick={() => props.setModalIsOpenToTrueWithId(props.reminder.id)}
    >
      <Table.Cell
        onClick={(e) => {
          e.stopPropagation();
          deleteReminder(props.reminder);
        }}
        align="center"
      >
        <div className="icon-delete">
          <Icon name="trash"></Icon>
        </div>
      </Table.Cell>
      <Table.Cell align="center">{props.reminder.description}</Table.Cell>
      <Table.Cell align="center">
        {milliSecToTime(props.reminder.time)}
      </Table.Cell>
      <Table.Cell align="center">
        {milliSecToDate(props.reminder.time)}
      </Table.Cell>
      <Table.Cell is="th" scope="row">
        {props.reminder.header}
      </Table.Cell>
    </Table.Row>
  );
}

export const MemoizedRow = React.memo(ReminderRow);

