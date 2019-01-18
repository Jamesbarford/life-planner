import * as React from "react";
import { WithRipple } from "../Ripple";
import { classNames } from "../../helpers/util";

interface ButtonProps {
  text: string;
  type?: ButtonType;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  persistFocus?: boolean;
  buttonStyle: ButtonStyle;
  onClick?: () => void;
}

export enum ButtonStyle {
  success = "success",
  confirm = "success",
  warning = "warning",
  light = "light"
}

export enum ButtonType {
  submit = "submit",
  button = "button",
  reset = "reset"
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  buttonStyle,
  onClick,
  text,
  type,
  style,
  autoFocus,
  persistFocus
}): JSX.Element => (
  <WithRipple rippleStyle={buttonStyle} persistFocus={persistFocus}>
    {injectedProps => (
      <button
        onMouseDown={injectedProps.handleMouseDown}
        onMouseUp={injectedProps.handleMouseUp}
        onBlur={injectedProps.resetRipple}
        autoFocus={autoFocus || false}
        onClick={onClick}
        style={style}
        className={classNames([
          `custom-button__${buttonStyle}`,
          "custom-button",
          `${injectedProps.animate ? "focus" : ""}`
        ])}
        type={type || ButtonType.button}
      >
        {text}
      </button>
    )}
  </WithRipple>
);
