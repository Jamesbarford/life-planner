import * as React from "react";
import { classNames } from "../../helpers/util";

interface ButtonProps {
  text: string;
  type?: string;
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

    const position = { left: x, right: y, top: y, bottom: x };
    return position;
  };

  rippleStyle = (size: number, position: React.CSSProperties) => {
    const animateStyle = { ...position, width: size, height: size };
    this.setState({ animate: true, animateStyle });
  };

  render() {
    const { buttonStyle, text, onClick, type } = this.props;
    const { animate, animateStyle } = this.state;

    return (
      <button
        ref={ref => (this.buttonRef = ref)}
        onMouseDown={this.handleMouseDown}
        onClick={onClick}
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
