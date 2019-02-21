import * as moment from "moment";
import { memoize } from "lodash";
import { Moment } from "moment";
import { TimePoint } from "../helpers/dateHelper";
import { BudgetState } from "./reducer";
import { Budget } from "./types";

export class BudgetSelector {
  public static getMonthBudget = memoize(
    (date: Moment, budgetState: BudgetState) => {
      return budgetState.monthlyBudget.get(date.format("YYYY-MM"));
    }
  );

  public static averageSpend(budget: number, date: Moment): number {
    const endOfMonth = moment().endOf(TimePoint.month);
    return budget / endOfMonth.diff(date, TimePoint.day);
  }

  public static ensureBudget(budget: Budget) {
    return budget && budget.id;
  }
}
