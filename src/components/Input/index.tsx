import * as React from "react";
import { classNames } from "../../helpers/util";
import { WithFocusLine } from "../FocusLine";

interface InputProps {
  inputType: InputType;
  placeholder?: string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export enum InputType {
  text = "text",
  password = "password",
  email = "email",
  number = "number"
}

export class Input extends React.Component<InputProps> {
  render() {
    const { onChange, inputType, placeholder, style, autoFocus } = this.props;

    return (
      <WithFocusLine>
        {injectedProps => (
          <input
            className={classNames([
              "custom-input",
              `${injectedProps.focused ? "focused" : ""}`
            ])}
            onFocus={injectedProps.handleFocus}
            onBlur={injectedProps.handleBlur}
            onChange={onChange}
            autoFocus={autoFocus || false}
            placeholder={placeholder}
            style={style}
            type={inputType}
          />
        )}
      </WithFocusLine>
    );
  }
}
