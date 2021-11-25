import React, { useState, useContext } from 'react';
import './RemindersList.css';
import { Tile, InputBox, Button, Icon, Table, Modal, ButtonGroup } from "@rocket.chat/fuselage";
import '@rocket.chat/icons/dist/rocketchat.css'
import { SocketContext } from "./contexts/socket/SocketContext";


type ReminderDetailsProps = {
    handleClose : () => void

}

export default function Reminders() {
    const [modalIsOpen,setModalIsOpen] = useState(false);

    const setModalIsOpenToTrue =()=>{
        setModalIsOpen(true)
    }

    const setModalIsOpenToFalse =()=>{
        setModalIsOpen(false)
    }

    return (
        <div className="reminders-list">
            <Tile>
                <h2>שלום</h2>
                <div className="reminders-table">
                    {modalIsOpen ? <ReminderDetails handleClose={setModalIsOpenToFalse} /> : <h1>hi</h1>}
                    <RemindersTable />
                </div>
                <div className="buttons">
                    <Button onClick={setModalIsOpenToTrue} primary>הוסף התראה</Button>
                    <Button primary danger>התנתק</Button>
                </div>
            </Tile>
        </div>
    );
}

function RemindersTable() {

    return (
    <Table fixed striped sticky>
        <Table.Head>
            <Table.Row>
                <Table.Cell>מחיקה</Table.Cell>
                <Table.Cell align='center'>תיאור</Table.Cell>
                <Table.Cell align='center'>שעה</Table.Cell>
                <Table.Cell align='center'>תאריך</Table.Cell>
                <Table.Cell align='center'>שם</Table.Cell>
            </Table.Row>
        </Table.Head>
        <Table.Body>
            <Table.Row>
                <Table.Cell align='center'>159</Table.Cell>
                <Table.Cell align='center'>6</Table.Cell>
                <Table.Cell align='center'>24</Table.Cell>
                <Table.Cell align='center'>4</Table.Cell>
                <Table.Cell is='th' scope='row'>Frozen yoghurt</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell align='center'>159</Table.Cell>
                <Table.Cell align='center'>6</Table.Cell>
                <Table.Cell align='center'>24</Table.Cell>
                <Table.Cell align='center'>4</Table.Cell>
                <Table.Cell is='th' scope='row'>Frozen yoghurt</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell align='center'>159</Table.Cell>
                <Table.Cell align='center'>6</Table.Cell>
                <Table.Cell align='center'>24</Table.Cell>
                <Table.Cell align='center'>4</Table.Cell>
                <Table.Cell is='th' scope='row'>Frozen yoghurt</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell align='center'>159</Table.Cell>
                <Table.Cell align='center'>6</Table.Cell>
                <Table.Cell align='center'>24</Table.Cell>
                <Table.Cell align='center'>4</Table.Cell>
                <Table.Cell is='th' scope='row'>Frozen yoghurt</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell align='center'>237</Table.Cell>
                <Table.Cell align='center'>9</Table.Cell>
                <Table.Cell align='center'>37</Table.Cell>
                <Table.Cell align='center'>4.3</Table.Cell>
                <Table.Cell is='th' scope='row'>Ice cream sandwich</Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>)
}

function ReminderDetails(props : ReminderDetailsProps) {
    
    return (
        <div>
             <Modal>
            <div className="reminder-details">
                <Modal.Header>
                    <Modal.Title>הוסף התראה</Modal.Title>
                    <Modal.Close onClick={props.handleClose}/>
                </Modal.Header>
                <Modal.Content>
                    <form className="reminder-details-form">
                        <div className="input">
                            <InputBox className="input-box" placeholder='שם' type='text' />
                        </div>
                        <div className="input">
                            <InputBox className="input-box" placeholder='תיאור' type='password' />
                        </div>
                        <div className="input">
                            <InputBox className="input-box" placeholder='תאריך' type='password' />
                        </div>
                        <div className="input">
                            <InputBox className="input-box" placeholder='שעה' type='password' />
                        </div>
                    </form>
                </Modal.Content>
                <Modal.Footer>
                    <Button primary>הוסף</Button>
                </Modal.Footer>
            </div>
        </Modal>
        </div>

       
    )
}



