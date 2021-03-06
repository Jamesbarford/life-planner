import { Map } from "immutable";
import * as moment from "moment";
import { BudgetActionTypes, BudgetActions } from "./actions";
import { CurrencyAccessor } from "../helpers/currencyAccessor";
import { Budget } from "./types";
import { UpdateState } from "../types/global";
import { setBudgetPerDay } from "./factories";
import { isEmpty } from "lodash";

export class BudgetState {
  constructor(
    public currentBudget: number = 0,
    public currentBudgetDisplay: string = CurrencyAccessor.format("en-GB", "0"),
    public month: number = 0,
    public monthlyBudget: Map<string, Budget> = Map(),
    public budgetPerDay: Map<string, number> = Map()
  ) {}
}

export function budgetReducer(
  state = new BudgetState(),
  action: BudgetActionTypes
): BudgetState {
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

      if (isEmpty(action.response.body)) {
        return updateState({
          currentBudget: 0,
          currentBudgetDisplay: CurrencyAccessor.format("en-GB", "0"),
          monthlyBudget: Map(),
          budgetPerDay: Map()
        });
      }

      const { body } = action.response;
      const date = moment(body.date);
      const hash = moment(date).format("YYYY-MM");
      const thisMonth = date.month() === moment().month();
      const amount = parseFloat(`${body.amount}`);

      const currentBudgetDisplay = CurrencyAccessor.format(
        "en-GB",
        `${body.amount}`
      );

      const budgetPerDay = setBudgetPerDay(amount, thisMonth ? moment() : date);

      return updateState({
        currentBudget: amount,
        currentBudgetDisplay,
        monthlyBudget: state.monthlyBudget.set(hash, body),
        budgetPerDay: state.budgetPerDay.merge(budgetPerDay)
      });
    }

    default:
      return state;
  }
}
