import * as React from "react";

interface ToolTipProps {
  helper: string;
  children?: React.ReactNode;
}

interface ToolTipState {
  isHovering: boolean;
  style: React.CSSProperties;
}

const ToolTipStyle: React.CSSProperties = {
  visibility: "hidden",
  position: "absolute",
  backgroundColor: "#616161e6",
  color: "white",
  fontSize: "12px",
  padding: "3px",
  borderRadius: "3px",
  zIndex: 10
};

const ToolTipStyleHovered: React.CSSProperties = {
  ...ToolTipStyle,
  visibility: "visible",
  transform: "scale(1,1)",
  transitionDuration: "200ms",
  transitionTimingFunction: "ease",
  transitionProperty: "all"
};

export class ToolTip extends React.Component<ToolTipProps, ToolTipState> {
  private wrapperRef: HTMLDivElement;

  state = { isHovering: false, style: ToolTipStyle };

  mouseEnter = () => {
    if (this.wrapperRef !== null) {
      const { height } = this.wrapperRef.getBoundingClientRect();
      const style = { ...ToolTipStyleHovered, marginTop: `${height}px` };
      this.setState({ style });
    }
  };

  mouseLeave = () => this.setState({ style: ToolTipStyle });

  render() {
    const { helper, children } = this.props;
    const { style } = this.state;

    return (
      <div
        ref={ref => (this.wrapperRef = ref)}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
      >
        <span style={{ ...style }}>{helper}</span>
        {children}
      </div>
    );
  }
}
