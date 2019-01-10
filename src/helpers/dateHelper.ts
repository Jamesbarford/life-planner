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
export const calculate = <D extends Moment>(
  date: D
): ((d: D) => Array<Moment>) => {
  // intializers
  let _done = false;

  // state of function
  const cache: WeekCache = {};
  const weeks: Array<Moment> = [];

  const mutableDate = date
    .clone()
    .startOf(TimePoint.month)
    .add(-1, "w")
    .day("Sunday");

  return d => {
    const formatDate = d.format("DD MM YYYY");
    const key = removeWhiteSpace(formatDate);

    // don't execute loop if we have that month in the cache
    if (key in cache) return cache[key];
    else {
      while (!_done) {
        mutableDate.add(1, "w");
        weeks.push(cloneDeep(mutableDate));

        _done = weeks.length === 5;
      }
      cache[key] = weeks;
      return weeks;
    }
  };
};
