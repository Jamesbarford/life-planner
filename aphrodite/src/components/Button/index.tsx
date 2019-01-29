import * as React from "react";
import { WithRipple } from "../Ripple";
import { classNames } from "../../helpers/util";

interface ButtonProps {
  text: React.ReactNode;
  padding: ButtonPadding;
  buttonStyle: ButtonStyle;
  type?: ButtonType;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  persistFocus?: boolean;
  onClick?: () => void;
}

export const enum ButtonPadding {
  small = "small-padding",
  normal = "normal-padding"
}

export const enum ButtonStyle {
  success = "success",
  confirm = "success",
  warning = "warning",
  light = "light"
}

export const enum ButtonType {
  submit = "submit",
  button = "button",
  reset = "reset"
}

/**
 * __Button__
 * @param text string;
 * @param padding ButtonPadding;
 * @param buttonStyle ButtonStyle;
 * @param type? ButtonType;
 * @param style? React.CSSProperties;
 * @param autoFocus? boolean;
 * @param persistFocus? boolean;
 * @param onClick? () => void;
 */
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
    <WithRipple rippleStyle={buttonStyle} persistFocus={persistFocus || false}>
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
