import * as React from "react";
import { classNames } from "../../helpers/util";
import { ButtonStyle } from "../Button";

interface WithRippleProps {
  persistFocus?: boolean;
  className?: string;
  rippleStyle: ButtonStyle;
  children: (props: InjectedWithRippleProps) => React.ReactNode;
}

interface WithRippleState {
  animate: boolean;
  animateStyle: React.CSSProperties;
}

interface InjectedWithRippleProps extends WithRippleState {
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseUp: () => void;
  resetRipple: () => void;
}
/**
 * __Ripple__
 * @param persistFocus? boolean;
 * @param className? string;
 * @param rippleStyle ButtonStyle;
 * @param children `(props: InjectedWithRippleProps) => React.ReactNode;`
 *
 * __InjectedWithRippleProps:__
 * @param handleMouseDown `(e: React.MouseEvent) => void;`
 * @param handleMouseUp `() => void;`
 * @param resetRipple `() => void;`
 *
 */
export class WithRipple extends React.Component<
  WithRippleProps,
  WithRippleState
> {
  private rippleRef: HTMLSpanElement;
  state = { animate: false, animateStyle: {} };

  handleMouseDown = (e: React.MouseEvent) => {
    const { offsetWidth, offsetHeight } = this.rippleRef;
    const size = offsetWidth >= offsetHeight ? offsetWidth : offsetHeight;
    const position = this.calculatePosition(e, this.rippleRef, size);
    return this.rippleStyle(size, position);
  };

  calculatePosition = (
    e: React.MouseEvent,
    parent: HTMLSpanElement,
    rippleSize: number
  ): React.CSSProperties => {
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

  handleMouseUp = () => {
    const { persistFocus } = this.props;
    if (persistFocus === false) {
      return setTimeout(() => this.resetRipple(), 300);
    }
    return;
  };

  resetRipple = () => this.setState({ animate: false, animateStyle: {} });

  render() {
    const { children, rippleStyle, className } = this.props;
    const { animate, animateStyle } = this.state;

    return (
      <div
        ref={ref => (this.rippleRef = ref)}
        className={classNames([
          "ripple-wrapper",
          `${className ? className : ""}`
        ])}
      >
        {children({
          animate,
          animateStyle,
          resetRipple: this.resetRipple,
          handleMouseDown: e => this.handleMouseDown(e),
          handleMouseUp: this.handleMouseUp
        })}
        {animate && (
          <span
            style={animateStyle}
            className={classNames(["ripple", `${rippleStyle}`])}
          />
        )}
      </div>
    );
  }
}
