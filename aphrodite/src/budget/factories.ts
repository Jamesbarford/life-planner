import * as moment from "moment";
import { Moment } from "moment";
import { TimePoint, alterTime } from "../helpers/dateHelper";
import { Dictionary } from "lodash";

export function setBudgetPerDay(
  budget: number,
  date: Moment
): Dictionary<number> {
  const endOfMonth = moment(date).endOf(TimePoint.month);
  const daysLeft = endOfMonth.diff(date, TimePoint.day);
  const spendPerDay = budget / daysLeft;
  let obj: Dictionary<number> = {};

  for (let i = 0; i <= daysLeft; i++) {
    const newDate = alterTime(date.clone(), i, TimePoint.day);
    const hash = newDate.format("YYYY-MM-DD");
    obj = { ...obj, [hash]: parseFloat(spendPerDay.toFixed(2)) };
  }

  return obj;
}
