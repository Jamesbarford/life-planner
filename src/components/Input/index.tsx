import * as React from "react";

interface InputProps {
  inputType: InputType;
  placeholder?: string;
  style?: React.CSSProperties;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export enum InputType {
  text = "text",
  password = "password",
  email = "email",
  number = "number"
}

export const Input: React.FunctionComponent<InputProps> = ({
  onChange,
  inputType,
  placeholder,
  style
}) => (
  <input
    className="custom-input"
    placeholder={placeholder}
    style={style}
    onChange={onChange}
    type={inputType}
  />
);
