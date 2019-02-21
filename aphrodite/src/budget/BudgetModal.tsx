import * as React from "react";
import { connect } from "react-redux";
import { Moment } from "moment";

// HELPERS
import { CurrencySymbols, mergeAmount } from "../helpers/currencyHelper";

// ACTIONS
import { SetBudget, AmendBudget } from "./actions";

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
import { BudgetSelector } from "./selectors";
import { ApplicationState } from "../App/types";

interface BudgetModalOwnProps {
  modalOpen: boolean;
  date: Moment;
  close: () => void;
}

interface MapDispatchToProps {
  setBudget: (budget: Budget) => void;
  amendBudget: (id: string, amount: number) => void;
}

interface MapStateToProps {
  currentMonthsBudget: Budget;
  id: string;
}

interface BudgetModalState {
  integer: string;
  fractional: string;
  inputWidth: string;
  [key: string]: string;
}

type BudgetModalProps = BudgetModalOwnProps &
  MapDispatchToProps &
  MapStateToProps;

class BudgetModal extends React.Component<BudgetModalProps, BudgetModalState> {
  state = { integer: "", fractional: "", inputWidth: "15.5px" };

  amountHandler = (key: MoneyKey, value: string) => {
    this.setState({ [key]: value });
  };

  submit = (e: React.FormEvent) => {
    e.preventDefault();
    const {
      date,
      close,
      setBudget,
      currentMonthsBudget,
      amendBudget,
      id
    } = this.props;
    const { integer, fractional } = this.state;

    const budget = mergeAmount(integer, fractional);

    if (
      BudgetSelector.ensureBudget(currentMonthsBudget) &&
      currentMonthsBudget.id === id
    ) {
      amendBudget(id, budget);
    } else {
      setBudget({ id, amount: budget, date });
    }

    return close();
  };

  render() {
    const { modalOpen, close, currentMonthsBudget } = this.props;
    const isBudget = BudgetSelector.ensureBudget(currentMonthsBudget);

    return (
      <Modal open={modalOpen} close={close}>
        <form className="event-modal" onSubmit={this.submit}>
          <h2>{`${isBudget ? "Amend" : "Set"} budget for month`}</h2>
          <div className="horizonal-wrapper">
            <h3 className="currency-symbol">{CurrencySymbols.sterling}</h3>
            <MoneyInput
              amount={
                isBudget && parseFloat(currentMonthsBudget.amount as string)
              }
              setBudget={this.amountHandler}
            />
          </div>
          <div className="horizonal-wrapper justify-end">
            <Button
              padding={ButtonPadding.small}
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

export const BudgetModalConnected = connect<
  MapStateToProps,
  MapDispatchToProps,
  BudgetModalOwnProps
>(
  ({ budget }: ApplicationState, ownProps: BudgetModalOwnProps) => ({
    currentMonthsBudget: BudgetSelector.getMonthBudget(ownProps.date, budget),
    id: ownProps.date.format("YYYY-MM")
  }),
  dispatch => ({
    setBudget: budget => dispatch(new SetBudget(budget)),
    amendBudget: (id, amount) => dispatch(new AmendBudget(id, amount))
  })
)(BudgetModal);
