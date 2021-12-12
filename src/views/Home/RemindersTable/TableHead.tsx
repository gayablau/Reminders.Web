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

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

export default function ReminderRow() {
  return (
    <Table.Head position="sticky" width="100%">
      <Table.Row>
        <Table.Cell>מחיקה</Table.Cell>
        <Table.Cell align="center">תיאור</Table.Cell>
        <Table.Cell align="center">שעה</Table.Cell>
        <Table.Cell align="center">תאריך</Table.Cell>
        <Table.Cell align="center">שם</Table.Cell>
      </Table.Row>
    </Table.Head>
  );
}
