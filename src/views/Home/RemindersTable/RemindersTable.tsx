import React, { useState, useContext } from 'react';
import '../RemindersList.css';
import { Tile, InputBox, Button, Icon, Table, Modal, ButtonGroup, TextInput } from "@rocket.chat/fuselage";
import '@rocket.chat/icons/dist/rocketchat.css'
//import Reminder from "../../../Types/ReminderType"
import {ReminderRow, MemoizedRow} from "./ReminderRow"
import TableHead from "./TableHead"
import {useReminders} from "../../../hooks/useReminders"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
import { Reminder } from '../../../Types/ReminderType';
import { propTypes } from '@rocket.chat/fuselage/dist/components/Banner';
import {MouseEventHandler} from 'react';
import { RemindersContext } from '../../../contexts/reminders/RemindersContext';

type TableProps = {
    openModal : (id : Reminder["id"]) => void
  };

export function RemindersTable({openModal} : TableProps) {
    
    const {reminders} = useContext(RemindersContext)
    return (
            <Table style={{ marginBottom: "20px"}} display='block' height="250px"  overflow="auto" fixed striped >
               <TableHead />
                <Table.Body >
                    {reminders.map(item => <MemoizedRow key={item.id} setModalIsOpenToTrueWithId={()=>openModal(item.id)} reminder={item} />)}
                </Table.Body> 
            </Table>
    )
}

export const MemoizedTable = React.memo(RemindersTable);