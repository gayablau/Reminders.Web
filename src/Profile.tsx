import React, { useState, useContext } from 'react';
import './Profile.css';
import { Tile, InputBox, Button, Icon } from "@rocket.chat/fuselage";
import '@rocket.chat/icons/dist/rocketchat.css'
import { SocketContext } from "./contexts/socket/SocketContext";

export default function Profile() {
  return (
    <div className="profile">
      <Tile>
        <div className="icon-back">
          <Icon name="arrow-back"></Icon>
        </div>
        <form className="profile-form">
          <div className="profile-header">
            <h1>פרטי משתמש</h1>
          </div>
          <div className="profile-input">
            <InputBox className="input-box" placeholder='שם משתמש' type='text' />
          </div>
          <div className="profile-submit">
            <Button primary>שמור</Button>
          </div>
        </form>
      </Tile>
    </div>
  );
}



