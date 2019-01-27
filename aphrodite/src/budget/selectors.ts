import * as moment from "moment";
import { Moment } from "moment";
import { TimePoint } from "../helpers/dateHelper";

export const averageSpend = (budget: number, date: Moment): number => {
  const endOfMonth = moment().endOf(TimePoint.month);
  const daysLeft = endOfMonth.diff(date, TimePoint.day);
  return budget / daysLeft;
};
