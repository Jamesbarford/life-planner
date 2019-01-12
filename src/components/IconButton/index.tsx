import * as React from "react";
import { BackgroundColor } from "./style";

interface IconProps {
  iconName: string;
  hoverBackground: BackgroundColor;
  btnStyle?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
  onClick: () => void;
}

export class Icon extends React.Component<IconProps> {
  state = { backgroundColor: "" };

  mouseEnter = () =>
    this.setState({ backgroundColor: this.props.hoverBackground });

  mouseLeave = () => this.setState({ backgroundColor: "" });

  render() {
    const { btnStyle, onClick, iconStyle, iconName } = this.props;
    const { backgroundColor } = this.state;

    return (
      <button
        onClick={onClick}
        className="icon-button__wrapper"
        onMouseLeave={this.mouseLeave}
        onMouseEnter={this.mouseEnter}
        style={{ ...btnStyle, backgroundColor: backgroundColor }}
      >
        <i style={iconStyle} className="material-icons icon-button">
          {iconName}
        </i>
      </button>
    );
  }
}
