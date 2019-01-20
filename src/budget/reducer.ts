import { BudgetActionType, BudgetActions } from "./actions";
import { currencyFormatter } from "../helpers/currencyHelper";

export class BudgetState {
  constructor(
    public currentBudget: number = 0,
    public currentBudgetDisplay: string = currencyFormatter("en-GB", "0")
  ) {}
}

export function budgetReducer(
  state = new BudgetState(),
  action: BudgetActionType
) {
  switch (action.type) {
    case BudgetActions.SetBudget:
      return {
        ...state,
        currentBudget: action.amount,
        currentBudgetDisplay: currencyFormatter("en-GB", `${action.amount}`)
      };
    default:
      return state;
  }
}
