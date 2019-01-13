import * as React from "react";
import { Icon } from "../IconButton";
import { BackgroundColor, CircularButton } from "../IconButton/style";

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  close: () => void;
}

export class Modal extends React.Component<ModalProps> {
  render() {
    const { open, children } = this.props;
    return (
      open && (
        <>
          <div className="modal-wrapper">
            <div className="modal-inner">
              <div className="modal-close">
                <Icon
                  onClick={this.props.close}
                  btnStyle={CircularButton}
                  hoverBackground={BackgroundColor.lightGray}
                  iconName="close"
                />
              </div>
              {children}
            </div>
          </div>
          <div className="modal-overlay" />
        </>
      )
    );
  }
}
