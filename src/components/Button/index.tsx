import * as React from "react";
import { classNames } from "../../helpers/util";

interface ButtonProps {
  text: string;
  type?: string;
  buttonStyle: ButtonStyle;
  onClick: () => void;
}

interface ButtonState {
  isClicked: boolean;
  animate: boolean;
  animateStyle: React.CSSProperties;
}

export enum ButtonStyle {
  success = "success",
  confirm = "success",
  warning = "warning"
}

export enum ButtonType {
  submit = "submit",
  button = "button",
  reset = "reset"
}

export class Button extends React.Component<ButtonProps, ButtonState> {
  private buttonRef: HTMLButtonElement;
  private btnAnimate = "btn-animate";

  state = { isClicked: false, animate: false, animateStyle: {} };

  handleClick = (event: React.MouseEvent) => {
    const { offsetWidth, offsetHeight } = this.buttonRef;
    const rippleSize = offsetWidth >= offsetHeight ? offsetWidth : offsetHeight;
    const ripplePosition = this.calculatePosition(
      event,
      this.buttonRef,
      rippleSize
    );
    return this.rippleStyle(rippleSize, ripplePosition);
  };

  calculatePosition = (
    event: React.MouseEvent,
    parent: HTMLButtonElement,
    rippleSize: number
  ) => {
    const bounds = parent.getBoundingClientRect();
    const x = event.clientX - bounds.left - rippleSize / 2;
    const y = event.clientY - bounds.top - rippleSize / 2;
    const position = { left: x, right: y, top: y, bottom: x };

    return position;
  };

  rippleStyle = (size: number, position: React.CSSProperties) => {
    clearTimeout();

    const animateStyle = {
      ...position,
      width: size,
      height: size
    };

    this.setState({ animate: true, animateStyle });
    return setTimeout(
      () => this.setState({ animate: false, animateStyle: {} }),
      400
    );
  };

  render() {
    const { buttonStyle, text, onClick, type } = this.props;
    const { animate, animateStyle } = this.state;

    return (
      <button
        ref={ref => (this.buttonRef = ref)}
        onClick={e => {
          this.handleClick(e);
          return onClick();
        }}
        className={classNames([
          `custom-button__${buttonStyle}`,
          "custom-button"
        ])}
        type={type || ButtonType.button}
      >
        {animate && <div style={animateStyle} className="ripple" />}
        {text}
      </button>
    );
  }
}
