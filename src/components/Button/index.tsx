import * as React from "react";
import { classNames } from "../../helpers/util";

interface ButtonProps {
  text: string;
  type?: string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  buttonStyle: ButtonStyle;
  onClick?: () => void;
}

interface ButtonState {
  isClicked: boolean;
  animate: boolean;
  animateStyle: React.CSSProperties;
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

export class Button extends React.Component<ButtonProps, ButtonState> {
  private buttonRef: HTMLButtonElement;

  state = { isClicked: false, animate: false, animateStyle: {} };

  handleMouseDown = (e: React.MouseEvent) => {
    const { offsetWidth, offsetHeight } = this.buttonRef;
    const size = offsetWidth >= offsetHeight ? offsetWidth : offsetHeight;
    const position = this.calculatePosition(e, this.buttonRef, size);
    return this.rippleStyle(size, position);
  };

  calculatePosition = (
    e: React.MouseEvent,
    parent: HTMLButtonElement,
    rippleSize: number
  ) => {
    const { left, top } = parent.getBoundingClientRect();
    const { clientX, clientY } = e;
    const halfOfRipple = rippleSize / 2;

    const x = clientX - left - halfOfRipple;
    const y = clientY - top - halfOfRipple;

    return { left: x, right: y, top: y, bottom: x };
  };

  rippleStyle = (size: number, position: React.CSSProperties) => {
    const animateStyle = { ...position, width: size, height: size };
    this.setState({ animate: true, animateStyle });
  };

  resetRipple = () => this.setState({ animate: false, animateStyle: {} });

  render() {
    const { buttonStyle, onClick, text, type, style, autoFocus } = this.props;
    const { animate, animateStyle } = this.state;

    return (
      <button
        ref={ref => (this.buttonRef = ref)}
        onMouseDown={this.handleMouseDown}
        onBlur={this.resetRipple}
        autoFocus={autoFocus || false}
        onClick={onClick}
        style={style}
        className={classNames([
          `custom-button__${buttonStyle}`,
          "custom-button"
        ])}
        type={type || ButtonType.button}
      >
        {animate && (
          <div
            style={animateStyle}
            className={classNames(["ripple", `${buttonStyle}`])}
          />
        )}
        {text}
      </button>
    );
  }
}
