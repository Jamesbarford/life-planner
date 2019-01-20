import * as React from "react";
import { classNames } from "../../helpers/util";
import { WithFocusLine } from "../FocusLine";

interface InputProps {
  inputType: InputType;
  value?: number | string;
  placeholder?: string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  pattern?: string;
  setRef?: React.Ref<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

/**
 * @example
 * text = "text",
 * password = "password",
 * email = "email",
 * number = "number"
 */
export enum InputType {
  text = "text",
  password = "password",
  email = "email",
  number = "number"
}

/**
 * __INPUT__
 * @param inputType InputType;
 * @param placeholder? string;
 * @param style? React.CSSProperties;
 * @param autoFocus? boolean;
 * @param onChange `(e: React.ChangeEvent<HTMLInputElement>) => void;`
 *
 * __InputType__
 * @example
 * text = "text",
 * password = "password",
 * email = "email",
 * number = "number"
 */
export const Input: React.FunctionComponent<InputProps> = ({
  onChange,
  inputType,
  placeholder,
  style,
  value,
  autoFocus,
  pattern,
  setRef,
  onKeyUp
}): JSX.Element => (
  <WithFocusLine style={style}>
    {injectedProps => (
      <input
        ref={setRef}
        className={classNames([
          "custom-input",
          `${injectedProps.focused ? "focused" : ""}`
        ])}
        onKeyUp={onKeyUp}
        onFocus={injectedProps.handleFocus}
        onBlur={injectedProps.handleBlur}
        onChange={onChange}
        pattern={pattern || undefined}
        autoFocus={autoFocus || false}
        placeholder={placeholder}
        style={style}
        value={value}
        type={inputType}
      />
    )}
  </WithFocusLine>
);
