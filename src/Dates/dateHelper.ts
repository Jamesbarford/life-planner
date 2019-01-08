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
  // ===========================================================================
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
  /**
   * 
   * @returns {*} day of week as string.
   * @example
   * DateHelper.getTodayString();
   * => "Monday"
   */
  static getTodayString(): string {
    const today = moment().day();
    return dayNames[today];
  }

  /**
   * 
   * @returns {*} day of week as string.
   * @example
   * DateHelper.getTodayNumeric();
   * => 2
   */
  static getTodayNumeric(): number {
    return moment().day();
  }


  /**
   * 
   * @param {day} number 0 - 7, day of week 0: Sunday - 7: Saturday
   * @returns {*} day of week as string.
   * @example
   * DateHelper.dayToString(2);
   * => Tuesday
   */
  static dayToString(day: number): string {
    return dayNames[day];
  }

  /**
   * 
   * @param {date} 0 - 31
   * @returns {*} time in milliseconds.
   * @example
   * DateHelper.getDate();
   * => 123425432113
   */
  static getDate(day?: number): Moment {
    const today = moment().day();
    return moment().date(day || today);
  }

  /**
   * 
   * @param {date} 0 - 31
   * @returns {*} formatted date.
   * @example
   * DateHelper.formatDate(31);
   * => "31st"
   */
  static formatDate(date: number): string {
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
  

   /**
   * 
   * @param {month} number 0 - 11
   * @param {year} number
   * @returns {*} how many days are in the month of that given year.
   * @example
   * DateHelper.getNumberOfDaysInMonth(0, 2019);
   * => 31
   */
  static getNumberOfDaysInMonth(month: number, year: number): number {
    const monthForDate = month + 1;
    return new Date(year, monthForDate, 0).getDate();
  }

  // WEEK
  // ===========================================================================
  /**
   * 
   * @returns {*} week of the year.
   * @example
   * DateHelper.getWeek();
   * => 50
   */
  static getWeek(): number {
    return moment().week();
  }

  // MONTHS
  // ===========================================================================
  /**
   * 
   * @returns {*} month in numerical form.
   * @example
   * DateHelper.getMonthNumeric();
   * => 0
   */
  static getMonthNumeric(): number {
    return moment().month();
  }

  /**
   * 
   * @param {month} - number
   * @returns {*} name of the month as a string.
   * @example
   * DateHelper.getMonthString(0);
   * => "Janurary"
   */
  static getMonthString(month: number): string {
    return monthNames[month || moment().month()];
  }

  // YEAR
  // ===========================================================================
  /**
   * 
   * @returns {*} current year.
   * @example
   * DateHelper.getYear();
   * => 2019
   */
  static getYear(): number {
    return moment().year();
  }

  // SET DATE
  // ===========================================================================
  /**
   * NEEDS TESTING
   * @param {timePoint} TimePoint - e.g "day"
   * @param {value} - number for the time point
   * @returns {*} ?.
   * @example
   * DateHelper.setTimePoint(timePoint, value);
   * => ?
   */
  static setTimePoint(timePoint: TimePoint, value: number): Moment {
    return moment().set(timePoint, value);
  }

  /**
   * NEEDS TESTING
   * @param {timepoint} - TimePoint
   * @param {value} - number
   * @returns {*} ?
   * @example
   * DateHelper.addTime()
   * => ?
   */
  static addTime(timepoint: TimePoint, value: number): Moment {
    return moment().add(value as any, timepoint);
  }
}