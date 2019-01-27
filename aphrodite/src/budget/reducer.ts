import { BudgetActionTypes, BudgetActions } from "./actions";
import { currencyFormatter } from "../helpers/currencyHelper";

export class BudgetState {
  constructor(
    public currentBudget: number = 0,
    public currentBudgetDisplay: string = currencyFormatter("en-GB", "0"),
    public month: number = 0
  ) {}
}

export function budgetReducer(
  state = new BudgetState(),
  action: BudgetActionTypes
) {
  switch (action.type) {
    case BudgetActions.SetBudget:
    case BudgetActions.GetBudget:
      return state;

    case BudgetActions.GetBudgetResponse:
    case BudgetActions.SetBudgetResponse:
      if (!action.response.success) return state;

      return {
        ...state,
        currentBudget: action.response.body.amount,
        currentBudgetDisplay: currencyFormatter(
          "en-GB",
          `${action.response.body.amount}`
        )
      };

    default:
      return state;
  }
}
