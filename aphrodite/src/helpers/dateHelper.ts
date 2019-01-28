import { Moment } from "moment";
import { cloneDeep } from "lodash";

// TYPES
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

    case TimePoint.hour:
      return TimePoint.minute;

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
      return 24;

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
 * Creates an Array of moments given:
 * @param date a moment
 * @param timePoint i.e month
 * @param unitOfTime amount of time to add
 * @param numberOfMoments the amount of moments to be in the array
 */
export const calculate = (
  date: Moment,
  timePoint: TimePointType,
  unitOfTime: number,
  numberOfMoments?: number
): Array<Moment> => {
  // intializers

  let _done = false;
  const index = getIndex(timePoint);
  const momentArr: Array<Moment> = [];
  const arrayLenth = numberOfMoments || index;

  const isDay = timePoint === TimePoint.day;
  const isHours = timePoint === TimePoint.hour;

  const duration = isDay ? 1 : isHours ? 30 : -1;

  const incrementor = findIncrementalTimePoint(timePoint);

  const mutableDate = date
    .clone()
    .startOf(timePoint)
    .add(duration, incrementor)
    .day(isDay || isHours ? "" : "Saturday");

  while (!_done) {
    momentArr.push(cloneDeep(mutableDate));
    mutableDate.add(unitOfTime, incrementor);
    _done = momentArr.length === arrayLenth;
  }
  return momentArr;
};

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
) => date.add(incrementor, t).clone();
