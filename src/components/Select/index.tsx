import * as React from "react";

interface SelectProps<T> {
  defaultValue: T;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: React.FunctionComponent<SelectProps<string>> = ({
  onChange,
  defaultValue,
  style,
  children
}) => (
  <select
    style={style}
    className="custom-select-input"
    defaultValue={defaultValue}
    onChange={onChange}
  >
    {children}
  </select>
);
