import React from "react";
import "../RemindersList.css";
import { TextInput } from "@rocket.chat/fuselage";
import "@rocket.chat/icons/dist/rocketchat.css";
import moment from "moment";

type DetailsTextInputProps = {
  value: string;
  placeholder: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function DetailsTextInput(props: DetailsTextInputProps) {
  return (
    <TextInput
      margin="5px"
      value={props.value}
      onChange={props.onChange}
      className="input-box"
      placeholder={props.placeholder}
      type={props.type}
      min={moment().format("YYYY-MM-DD")}
    />
  );
}
