import * as React from "react";
import { classNames } from "../../helpers/util";

interface InputProps {
  inputType: InputType;
  placeholder?: string;
  style?: React.CSSProperties;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface InputState {
  focused: boolean;
}

export enum InputType {
  text = "text",
  password = "password",
  email = "email",
  number = "number"
}
export class Input extends React.Component<InputProps, InputState> {
  state = { focused: false };

  handleFocus = () => this.setState({ focused: true });

  render() {
    const { onChange, inputType, placeholder, style } = this.props;
    const { focused } = this.state;

    return (
      <>
        <input
          className="custom-input"
          onFocus={this.handleFocus}
          placeholder={placeholder}
          style={style}
          onChange={onChange}
          type={inputType}
        />
        <div
          className={classNames([
            "custom-input-border",
            `${focused ? "focused" : ""}`
          ])}
        />
      </>
    );
  }
}
