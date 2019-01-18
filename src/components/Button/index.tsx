import * as React from "react";
import { WithRipple } from "../Ripple";
import { classNames } from "../../helpers/util";

interface ButtonProps {
  text: string;
  padding: ButtonPadding;
  buttonStyle: ButtonStyle;
  type?: ButtonType;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  persistFocus?: boolean;
  onClick?: () => void;
}

export enum ButtonPadding {
  small = "small-padding",
  normal = "normal-padding"
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
  padding,
  persistFocus
}): JSX.Element => (
  <div className="custom-button__wrapper">
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
            `${injectedProps.animate ? "focus" : ""}`,
            `${padding}`
          ])}
          type={type || ButtonType.button}
        >
          {text}
        </button>
      )}
    </WithRipple>
  </div>
);
