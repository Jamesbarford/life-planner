import { Map } from "immutable";
import * as moment from "moment";
import { BudgetActionTypes, BudgetActions } from "./actions";
import { currencyFormatter } from "../helpers/currencyHelper";
import { Budget } from "./types";
import { setMonthBudget } from "./factories";
import { UpdateState } from "../types/global";

export class BudgetState {
  constructor(
    public currentBudget: number = 0,
    public currentBudgetDisplay: string = currencyFormatter("en-GB", "0"),
    public month: number = 0,
    public monthlyBudget: Map<string, Budget> = Map()
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
    case BudgetActions.GetBudget:
      return state;

    case BudgetActions.GetBudgetResponse:
    case BudgetActions.SetBudgetResponse:
      if (!action.response.success) return state;

      return updateState({
        currentBudget: action.response.body.amount,
        currentBudgetDisplay: currencyFormatter(
          "en-GB",
          `${action.response.body.amount}`
        ),
        monthlyBudget: state.monthlyBudget.merge(
          setMonthBudget(
            moment(action.response.body.date),
            action.response.body
          )
        )
      });

    default:
      return state;
  }
}
