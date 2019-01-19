import * as React from "react";
import { debounce } from "lodash";
import { Button, ButtonPadding, ButtonStyle } from "../Button";
import { ToolTip } from "../ToolTip";

interface CustomSelectState {
  showList: boolean;
}

interface CustomSelectListInjectedProps {
  closeList: () => void;
}
interface CustomSelectProps {
  text: string;
  helperText: string;
  children: (props: CustomSelectListInjectedProps) => React.ReactNode;
}

export class CustomSelect extends React.Component<
  CustomSelectProps,
  CustomSelectState
> {
  private selectRef: HTMLDivElement;
  state = { showList: false };

  componentDidUpdate() {
    if (!this.state.showList) {
      return document.body.removeEventListener("click", this.closeList);
    } else {
      return document.body.addEventListener("click", this.closeList);
    }
  }

  showList = () => this.setState({ showList: true });

  closeList = () => {
    setTimeout(() => {
      this.setState({ showList: false });
    }, 450);
  };

  render() {
    const { children, text, helperText } = this.props;
    const { showList } = this.state;

    return (
      <div ref={ref => (this.selectRef = ref)} className="selecter-wrapper">
        <ToolTip helper={helperText}>
          <Button
            persistFocus={true}
            text={text}
            onClick={this.showList}
            padding={ButtonPadding.small}
            buttonStyle={ButtonStyle.light}
          />
        </ToolTip>
        {showList && (
          <CustomSelectList
            parent={this.selectRef}
            children={children({ closeList: this.closeList })}
          />
        )}
      </div>
    );
  }
}

interface CustomSelectListProps {
  parent: HTMLDivElement;
}

interface CustomSelectListState {
  parentRect: ClientRect;
  childRect: ClientRect;
  windowHeight: number;
}

class CustomSelectList extends React.Component<
  CustomSelectListProps,
  CustomSelectListState
> {
  private listRef: HTMLUListElement;
  private PADDING_BOTTOM = 20;
  private PADDING_TOP = 5;
  private initalRectDimensions: ClientRect = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0
  };

  state = {
    parentRect: this.initalRectDimensions,
    childRect: this.initalRectDimensions,
    windowHeight: 0
  };

  componentDidMount() {
    this.calcWindowHeight();
    this.calcClientRect();

    window.addEventListener("resize", this.calcWindowHeight);
    window.addEventListener("scroll", debounce(this.calcClientRect, 100));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.calcWindowHeight);
    window.removeEventListener("scroll", this.calcClientRect);
  }

  calcWindowHeight = () => this.setState({ windowHeight: window.innerHeight });

  calcClientRect = () => {
    if (!this.props.parent !== null && !this.listRef !== null) {
      const parentRect = this.props.parent;
      const childRect = this.listRef;
      this.setState({
        parentRect: parentRect.getBoundingClientRect(),
        childRect: childRect.getBoundingClientRect()
      });
    }
  };

  listStyle = () => {
    if (!this.listRef || !this.props.parent) return;
    const { parentRect, windowHeight, childRect } = this.state;

    return {
      top: `${parentRect.height + this.PADDING_TOP}px`,
      maxHeight: `${windowHeight - childRect.top - this.PADDING_BOTTOM}px`,
      minHeight: "150px"
    };
  };

  render() {
    const { children } = this.props;

    return (
      <ul
        ref={ref => (this.listRef = ref)}
        className="selecter-list"
        style={this.listStyle()}
      >
        {children}
      </ul>
    );
  }
}
