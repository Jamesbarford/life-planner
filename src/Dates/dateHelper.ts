import * as moment from "moment";
import { Moment, unitOfTime } from "moment";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const dayNames = [
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
  year = "year",
  month = "month",
  date ="date",
  hour = "hour",
  minute = "minute",
  second = "second",
  millisecond = "millisecond"
}


type TimePointObject = {
  date: unitOfTime.All,
  value: number;
};

export class DateHelper {

  /**
   * 
   * @param date Epoch time in setMilliseconds.
   * @returns {*} Full date and local time.
   * @example
   * DateHelper.getFullDate();
   * => "Sat Jan 05 2019 22:11:54 GMT+0000 (Greenwich Mean Time)"
   */
  static getFullDate(date?: number): Date {
    if (date) return new Date(date);
    return new Date();
  };

  // TIME
  // 
  /**
   * 
   * @param {showSeconds} boolean as to whether to show seconds on clock
   * @returns {*} time as a string.
   * @example 
   * DateHelper.getCurrentTime(true);
   * => "21:56:21"
   */
  static getCurrentTime(showSeconds: boolean): string {
    const checkTime = (seconds: number) => {
      let int: number | string = seconds;
      if (seconds < 10) {
        int = "0" + seconds;
      }
      return int;
    }
    const hours = checkTime(new Date().getHours());
    const minutes = checkTime(new Date().getMinutes());
    const seconds = checkTime(new Date().getSeconds());
    const clockTime = `${hours}:${minutes}${showSeconds? `:${seconds}` : ""}`;
    return clockTime;
  }

  // DAYS
  // ===========================================================================
  static getTodayString(): string {
    const today = moment().day();
    return dayNames[today];
  }

  static getTodayNumeric(): number {
    return moment().day();
  }

  static dayToString(day: number): string {
    return dayNames[day];
  }

  static getDate(day?: number, format?: boolean): number | string | Moment {
    const today = moment().day();
    return moment().date(day || today);
  }

  static formatDate(date: number) {
    switch(date) {
      case 1:
      case 21:
      case 31:
        return `${date}st`;
      
      case 2:
      case 22:
        return `${date}nd`;
      
      case 3:
      case 23:
        return `${date}rd`;

      default:
        return `${date}th`;
    }
  }
  

  static getNumberOfDaysInMonth(month: number, year: number): number {
    const monthForDate = month + 1;
    return new Date(year, monthForDate, 0).getDate();
  }

  // WEEK
  // ===========================================================================
  static getWeek() {
    return moment().week();
  }

  // MONTHS
  // ===========================================================================
  static getMonthNumeric(): number {
    return moment().month();
  }

  static getMonthString(month: number): string {
    return monthNames[month || moment().month()];
  }

  // YEAR
  // ===========================================================================
  static getYear(): number {
    return moment().year();
  }

  // SET DATE
  // ===========================================================================
  static setIndividualTimePoint(timePoint: unitOfTime.All, value: number) { 
    return moment().set(timePoint, value);
  }

  static setTimePoint(timePoint: TimePoint, value: number) {
    return moment().set(timePoint, value);
  }

  static addTime(timepoint: object) {
    moment().add(...timepoint as any);
  }
}