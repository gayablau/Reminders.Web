import React, { useContext } from "react";
import "../RemindersList.css";
import { Table } from "@rocket.chat/fuselage";
import "@rocket.chat/icons/dist/rocketchat.css";
import { MemoizedRow } from "./ReminderRow";
import TableHead from "./TableHead";
import { Reminder } from "../../../Types/ReminderType";
import { RemindersContext } from "../../../contexts/reminders/RemindersContext";

type TableProps = {
  openModal: (id: Reminder["id"]) => void;
};

export function RemindersTable({ openModal }: TableProps) {
  const { reminders } = useContext(RemindersContext);
  return (
    <Table
      marginBlockEnd="20px"
      display="block"
      height="250px"
      overflow="auto"
      fixed
      striped
    >
      <TableHead />
      <Table.Body>
        {reminders.map((item) => (
          <MemoizedRow
            key={item.id}
            setModalIsOpenToTrueWithId={() => openModal(item.id)}
            reminder={item}
          />
        ))}
      </Table.Body>
    </Table>
  );
}

export const MemoizedTable = React.memo(RemindersTable);
