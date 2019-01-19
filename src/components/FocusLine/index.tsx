import * as React from "react";
import { classNames } from "../../helpers/util";

interface InjectedWithFocusLineProps {
  focused: boolean;
  handleFocus: () => void;
  handleBlur: () => void;
}

interface WithFocusLineProps {
  children: (props: InjectedWithFocusLineProps) => React.ReactNode;
}

interface WithFocusLineState {
  focused: boolean;
}
/**
 * __WithFocusLine__
 * @param children `(props: InjectedWithFocusLineProps) => React.ReactNode;`
 *
 * __InjectedProps__
 * @param focused boolean;
 * @param handleFocus () => void;
 * @param handleBlur () => void;
 */
export class WithFocusLine extends React.Component<
  WithFocusLineProps,
  WithFocusLineState
> {
  state = { focused: false };

  render() {
    const { children } = this.props;
    const { focused } = this.state;

    return (
      <div className="reset-width">
        {children({
          focused,
          handleFocus: () => this.setState({ focused: true }),
          handleBlur: () => this.setState({ focused: false })
        })}
        <span
          className={classNames(["focus-line", `${focused ? "focused" : ""}`])}
        />
      </div>
    );
  }
}
