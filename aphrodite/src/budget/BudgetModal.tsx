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
import { Modal } from "../components/Modal";
import { MoneyInput, MoneyKey } from "../components/MoneyInput";

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
  state = { integer: "", fractional: "", inputWidth: "15.5px" };

  amountHandler = (key: MoneyKey, value: string) => {
    this.setState({ [key]: value });
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

    return (
      <Modal open={modalOpen} close={close}>
        <form className="event-modal" onSubmit={this.submit}>
          <h2>Set budget for month</h2>
          <div className="horizonal-wrapper">
            <h3 className="currency-symbol">{CurrencySymbols.sterling}</h3>
            <MoneyInput setBudget={this.amountHandler} />
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
