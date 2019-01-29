import * as moment from "moment";
import { Map } from "immutable";
import { Moment } from "moment";
import { Budget } from "./types";
import { TimePoint, alterTime } from "../helpers/dateHelper";

export function setMonthBudget(date: Moment, budget: Budget) {
  const hash = moment(date).format("YYYY-MM");
  return Map({ [hash]: budget });
}

export function setBudgetPerDay(
  budget: number,
  date: Moment
): Map<string, number> {
  let _obj: { [key: string]: number } = {};

  const endOfMonth = moment().endOf(TimePoint.month);
  const daysLeft = endOfMonth.diff(date, TimePoint.day);
  const spendPerDay = budget / daysLeft;

  for (let i = 0; i <= daysLeft; i++) {
    const newDate = alterTime(date.clone(), i, TimePoint.day);
    const hash = newDate.format("YYYY-MM-DD");
    _obj = { ..._obj, [hash]: parseFloat(spendPerDay.toFixed(2)) };
  }

  return Map(_obj);
}
