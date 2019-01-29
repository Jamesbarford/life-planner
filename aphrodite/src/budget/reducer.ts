import { Map } from "immutable";
import * as moment from "moment";
import { BudgetActionTypes, BudgetActions } from "./actions";
import { currencyFormatter } from "../helpers/currencyHelper";
import { Budget } from "./types";
import { setMonthBudget } from "./factories";
import { UpdateState } from "../types/global";
import { setBudgetPerDay } from "./factories";

export class BudgetState {
  constructor(
    public currentBudget: number = 0,
    public currentBudgetDisplay: string = currencyFormatter("en-GB", "0"),
    public month: number = 0,
    public monthlyBudget: Map<string, Budget> = Map(),
    public budgetPerDay: Map<string, number> = Map()
  ) {}
}

export function budgetReducer(
  state = new BudgetState(),
  action: BudgetActionTypes
) {
  const updateState: UpdateState<BudgetState> = update => ({
    ...state,
    ...update
  });

  switch (action.type) {
    case BudgetActions.SetBudget:
    case BudgetActions.AmendBudget:
    case BudgetActions.GetBudget:
      return state;

    case BudgetActions.GetBudgetResponse:
    case BudgetActions.AmendBudgetResponse:
    case BudgetActions.SetBudgetResponse: {
      if (!action.response.success) return state;

      const { body } = action.response;
      const date = moment(body.date);
      const amount = parseFloat(`${body.amount}`);

      const currentBudgetDisplay = currencyFormatter("en-GB", `${body.amount}`);
      const monthlyBudget = setMonthBudget(date, body);
      const budgetPerDay = setBudgetPerDay(amount, date);

      return updateState({
        currentBudget: amount,
        currentBudgetDisplay,
        monthlyBudget: state.monthlyBudget.merge(monthlyBudget),
        budgetPerDay: state.budgetPerDay.merge(budgetPerDay)
      });
    }

    default:
      return state;
  }
}
