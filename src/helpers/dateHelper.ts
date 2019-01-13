import { Moment } from "moment";
import { cloneDeep } from "lodash";
import { removeWhiteSpace } from "./util";
import { StringIndexSignature } from "../types/global";
import { CalendarState } from "../Calendar/reducer";

export enum TimePoint {
  d = "d",
  day = "day",
  days = "days",
  w = "w",
  week = "week",
  weeks = "weeks",
  M = "M",
  month = "month",
  months = "months",
  y = "y",
  year = "year",
  years = "years",
  date = "date",
  h = "h",
  hour = "hour",
  hours = "hours",
  m = "m",
  minute = "minute",
  minutes = "minutes",
  s = "s",
  second = "second",
  seconds = "seconds",
  ms = "ms",
  millisecond = "millisecond",
  milliseconds = "milliseconds"
}

export type TimePointType =
  | "year"
  | "years"
  | "y"
  | "month"
  | "months"
  | "M"
  | "week"
  | "weeks"
  | "w"
  | "day"
  | "days"
  | "d"
  | "hour"
  | "hours"
  | "h"
  | "minute"
  | "minutes"
  | "m"
  | "second"
  | "seconds"
  | "s"
  | "millisecond"
  | "milliseconds"
  | "ms";

export interface WeekCache extends StringIndexSignature<Array<Moment>> {}

export const findIncrementalTimePoint = (timePoint: TimePointType) => {
  switch (timePoint) {
    case TimePoint.year:
      return TimePoint.month;

    case TimePoint.month:
      return TimePoint.week;

    case TimePoint.week:
      return TimePoint.day;

    case TimePoint.day:
      return TimePoint.hour;

    default:
      return TimePoint.week;
  }
};

function getIndex(t: TimePointType) {
  switch (t) {
    case TimePoint.month:
      return 5;

    case TimePoint.week:
      return 1;

    case TimePoint.day:
      return 25;

    default:
      return 5;
  }
}

export function getHashIndex(t: TimePointType, state: CalendarState) {
  switch (t) {
    case TimePoint.week:
      return state.date.week(state.currentWeek);
    case TimePoint.month:
      return state.date.month(state.currentMonth);
    case TimePoint.day:
      return state.date.dayOfYear(state.dayOfYear);
  }
}

/**
 * Memoized date storage
 * this contains a while loop so better to cache the array of moments than
 * re-compute
 */
export const calculate = (
  date: Moment,
  timePoint?: TimePointType
): ((d: Moment, t?: TimePointType) => Array<Moment>) => {
  // intializers
  let _done = false;
  const index = getIndex(timePoint);

  // state of function
  const cache: WeekCache = {};
  const momentArr: Array<Moment> = [];

  return (d, t) => {
    const formatDate = date.format("DD MM YYYY");
    const key = removeWhiteSpace(formatDate);
    // don't execute loop if we have that month in the cache
    if (key in cache) return cache[key];
    else {
      const isDay = timePoint === TimePoint.day;
      const duration = isDay ? 0 : -1;
      const incrementor = findIncrementalTimePoint(t);
      const mutableDate = date
        .clone()
        .startOf(t)
        .add(duration, incrementor)
        .day(isDay ? "" : "Saturday");

      while (!_done) {
        momentArr.push(cloneDeep(mutableDate));
        mutableDate.add(1, incrementor);
        _done = momentArr.length === index;
      }
      cache[key] = momentArr;
      return momentArr;
    }
  };
};

/**
 * This is due to some numbers not centering in the circle:
 * - `10`, `12`, `13`, `18` & `19`
 * @param day Moment - the day to determine if padding is needed
 * @returns either "2px" or "0px"
 *
 */
export function paddingRight(day: Moment): string {
  switch (parseInt(day.format("D"))) {
    case 10:
    case 12:
    case 13:
    case 18:
    case 19:
      return "2px";

    default:
      return "0px";
  }
}

/**
 *
 * @param date the date of which the time will alter
 * @param incrementor how far to increment the time
 * @param t timepoint ie month
 * @returns Moment
 * @example
 * alterTime(moment(), 1, TimePoint.month)
 */
export const alterTime = (
  date: Moment,
  incrementor: number,
  t: TimePointType
) => date.add(incrementor, t);
