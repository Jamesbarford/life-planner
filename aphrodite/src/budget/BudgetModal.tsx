import * as React from "react";
import { connect } from "react-redux";
import { Moment } from "moment";

// HELPERS
import { CurrencySymbols, mergeAmount } from "../helpers/currencyHelper";

// ACTIONS
import { SetBudget } from "./actions";

// COMPONENTS
import {
  Button,
  ButtonStyle,
  ButtonType,
  ButtonPadding
} from "../components/Button";
import { Input, InputType } from "../components/Input";
import { Modal } from "../components/Modal";

// TYPES
import { Budget } from "./types";

interface BudgetModalOwnProps {
  modalOpen: boolean;
  date: Moment;
  close: () => void;
}

interface MapDispatchToProps {
  setBudget: (budget: Budget) => void;
}

interface BudgetModalState {
  integer: string;
  fractional: string;
  inputWidth: string;
  [key: string]: string;
}

type BudgetModalProps = BudgetModalOwnProps & MapDispatchToProps;

class BudgetModal extends React.Component<BudgetModalProps, BudgetModalState> {
  private integer = "integer";
  private fractional = "fractional";

  state = { integer: "", fractional: "", inputWidth: "15.5px" };

  calculateInputWidth = (str: string) => {
    const MULTIPLIER = 15.5;
    const width = str.length * MULTIPLIER + "px";
    this.setState({ inputWidth: width });
  };

  amountHandler = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (e.target.value.length < 1) return this.setState({ [key]: "" });
    let _amount = e.target.value.match(/\d+/g).join("");
    if (key === this.fractional) {
      if (_amount.length >= 2) _amount = _amount.substring(0, 2);
    } else if (key === this.integer) {
      this.calculateInputWidth(e.target.value);
    }
    this.setState({ [key]: _amount });
  };

  submit = (e: React.FormEvent) => {
    e.preventDefault();
    const { date, close, setBudget } = this.props;
    const { integer, fractional } = this.state;

    const budget = mergeAmount(integer, fractional);

    setBudget({ id: date.format("YYYY-MM"), amount: budget, date });

    close();
  };

  render() {
    const { modalOpen, close } = this.props;
    const { integer, fractional } = this.state;

    return (
      <Modal open={modalOpen} close={close}>
        <form className="event-modal" onSubmit={this.submit}>
          <h2>Set budget for month</h2>
          <div className="horizonal-wrapper">
            <h3 className="currency-symbol">{CurrencySymbols.sterling}</h3>
            <Input
              style={{ width: this.state.inputWidth }}
              onChange={e => this.amountHandler(e, this.integer)}
              inputType={InputType.text}
              value={integer}
              placeholder="0"
              pattern="\d*"
            />
            .
            <Input
              style={{ width: "30px" }}
              onChange={e => this.amountHandler(e, this.fractional)}
              inputType={InputType.text}
              value={fractional}
              placeholder="00"
              pattern="\d*"
            />
          </div>
          <div className="horizonal-wrapper justify-end">
            <Button
              padding={ButtonPadding.small}
              onClick={() => {}}
              buttonStyle={ButtonStyle.light}
              text="More options"
            />
            <Button
              padding={ButtonPadding.normal}
              type={ButtonType.submit}
              buttonStyle={ButtonStyle.success}
              text="Save"
            />
          </div>
        </form>
      </Modal>
    );
  }
}

export const BudgetModalConnected = connect<{}, MapDispatchToProps, {}>(
  null,
  dispatch => ({ setBudget: budget => dispatch(new SetBudget(budget)) })
)(BudgetModal);
