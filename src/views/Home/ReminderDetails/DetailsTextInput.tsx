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

export default function DetailsTextInput({
  value,
  onChange,
  placeholder,
  type,
}: DetailsTextInputProps) {
  return (
    <TextInput
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      min={moment().format("YYYY-MM-DD")}
    />
  );
}
