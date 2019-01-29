import * as moment from "moment";
import { memoize } from "lodash";
import { Moment } from "moment";
import { TimePoint } from "../helpers/dateHelper";
import { BudgetState } from "./reducer";
import { Budget } from "./types";

export function averageSpend(budget: number, date: Moment): number {
  const endOfMonth = moment().endOf(TimePoint.month);
  const daysLeft = endOfMonth.diff(date, TimePoint.day);
  return budget / daysLeft;
}

export const getMonthBudget = memoize(
  (date: Moment, budgetState: BudgetState) => {
    return budgetState.monthlyBudget.get(date.format("YYYY-MM"));
  }
);

export const ensureBudget = (budget: Budget) => budget && budget.id;
