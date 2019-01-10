import { Moment } from "moment";
import { cloneDeep } from "lodash";
import { removeWhiteSpace } from "./util";

export const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export enum TimePoint {
  day = "day",
  week = "week",
  month = "month",
  year = "year",
  date = "date",
  hour = "hour",
  minute = "minute",
  second = "second",
  millisecond = "millisecond"
}

interface WeekCache {
  [key: string]: Array<Moment>;
}

/**
 * Memoized date storage
 * this contains a while loop so better to cache the array of moments than
 * re-compute
 */
export const calculate = (date: Moment) => {
  // intializers
  let _done = false;
  let _count = 0;
  let _monthIndex = date.month();

  // state of function
  const cache: WeekCache = {};
  const weeks: Array<Moment> = [];

  const mutableDate = date
    .clone()
    .startOf(TimePoint.month)
    .add(-1, "w")
    .day("Sunday");

  return (d: Moment): Array<Moment> => {
    const key = d.format("DD MM YYYY");
    const x = removeWhiteSpace(key);

    if (x in cache) return cache[x];
    else {
      while (!_done) {
        mutableDate.add(1, "w");
        weeks.push(cloneDeep(mutableDate));
        _done = _count++ > 2 && _monthIndex !== mutableDate.month();
        _monthIndex = mutableDate.month();
      }
      cache[x] = weeks;
      return weeks;
    }
  };
};
