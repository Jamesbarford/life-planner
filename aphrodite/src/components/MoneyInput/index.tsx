import * as React from "react";
import { Input, InputType } from "../Input";

interface MoneyInputProps {
  setBudget: (key: MoneyKey, value: string) => void;
}

interface MoneyInputState {
  integer: string;
  fractional: string;
  inputWidth: string;
  [key: string]: string;
}

export const enum MoneyKey {
  integer = "integer",
  fractional = "fractional"
}

export class MoneyInput extends React.Component<
  MoneyInputProps,
  MoneyInputState
> {
  state = { integer: "", fractional: "", inputWidth: "15.5px" };

  calculateInputWidth = (str: string) => {
    const MULTIPLIER = 15.5;
    const inputWidth = str.length * MULTIPLIER + "px";
    this.setState({ inputWidth });
  };

  amountHandler = (e: React.ChangeEvent<HTMLInputElement>, key: MoneyKey) => {
    const valid = e.target.value.replace(/\D+/g, "");
    if (valid.length < 1) return this.setState({ [key]: "" });

    let _amount = valid;
    if (key === MoneyKey.fractional) {
      if (_amount.length >= 2) _amount = _amount.substring(0, 2);
    } else if (key === MoneyKey.integer) {
      this.calculateInputWidth(e.target.value);
    }
    this.props.setBudget(key, _amount);
    this.setState({ [key]: _amount });
  };

  render() {
    const { integer, fractional, inputWidth } = this.state;

    return (
      <>
        <Input
          style={{ width: inputWidth }}
          onChange={e => this.amountHandler(e, MoneyKey.integer)}
          inputType={InputType.text}
          value={integer}
          placeholder="0"
        />
        .
        <Input
          style={{ width: "30px" }}
          onChange={e => this.amountHandler(e, MoneyKey.fractional)}
          inputType={InputType.text}
          value={fractional}
          placeholder="00"
        />
      </>
    );
  }
}
