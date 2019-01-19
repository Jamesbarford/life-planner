import * as React from "react";
import { Icon } from "../IconButton";
import { BackgroundColor, CircularButton } from "../IconButton/style";

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  close: () => void;
}

/**
 * __Modal__
 * @param open boolean;
 * @param children React.ReactNode;
 * @param close () => void;
 */
export const Modal: React.FunctionComponent<ModalProps> = ({
  open,
  children,
  close
}): JSX.Element =>
  open && (
    <>
      <div className="modal-wrapper">
        <div className="modal-inner">
          <div className="modal-close">
            <Icon
              onClick={close}
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
  );
