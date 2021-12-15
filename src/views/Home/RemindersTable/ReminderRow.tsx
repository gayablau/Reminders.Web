import React from "react";
import "../RemindersList.css";
import { Icon, Table } from "@rocket.chat/fuselage";
import "@rocket.chat/icons/dist/rocketchat.css";
import { useSocket } from "../../../hooks/useSocket";
import { Reminder } from "../../../Types/Reminder";
import moment from "moment";

type RowProps = {
  reminder: Reminder;
  openModalWithId: (id: Reminder["id"]) => void;
};

export function ReminderRow(props: RowProps) {
  const { deleteReminder } = useSocket();

  const milliSecToTime = (milliSec: number) => {
    return moment(milliSec).format("HH:mm");
  };

  const milliSecToDate = (milliSec: number) => {
    return moment(milliSec).format("DD/MM/YYYY");
  };

  const clickTrash = (e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => {
    e.stopPropagation();
    deleteReminder(props.reminder);
  };

  return (
    <Table.Row
      className="row"
      onClick={() => props.openModalWithId(props.reminder.id)}
    >
      <Table.Cell is="th" scope="row">
        {props.reminder.header}
      </Table.Cell>
      <Table.Cell align="center">
        {milliSecToDate(props.reminder.time)}
      </Table.Cell>
      <Table.Cell align="center">
        {milliSecToTime(props.reminder.time)}
      </Table.Cell>
      <Table.Cell align="center">{props.reminder.description}</Table.Cell>
      <Table.Cell onClick={clickTrash} align="center">
        <Icon color="red" name="trash"></Icon>
      </Table.Cell>
    </Table.Row>
  );
}

export const MemoizedRow = React.memo(ReminderRow);
