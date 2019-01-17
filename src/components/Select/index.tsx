import * as React from "react";
import { WithFocusLine } from "../FocusLine";

interface SelectProps {
  defaultValue: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: React.FunctionComponent<SelectProps> = ({
  onChange,
  defaultValue,
  style,
  children
}): JSX.Element => (
  <WithFocusLine>
    {injectedProps => (
      <select
        onFocus={injectedProps.handleFocus}
        onBlur={injectedProps.handleBlur}
        style={style}
        className="custom-select-input"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {children}
      </select>
    )}
  </WithFocusLine>
);
