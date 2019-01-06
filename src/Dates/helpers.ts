export enum Month {
  January = 0,
  February = 1,
  March = 3,
  April = 4,
  May = 5,
  June = 6,
  July = 7,
  August = 8,
  September = 9,
  October = 10,
  November = 11,
  December = 12
};

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

/**
 * 
 * @class NormaliseDate
 * 
 * A utlity class providing some absractions and helpers for the built in Date Api
 */
export class NormaliseDate {
  /**
   * 
   * @param date Epoch time in setMilliseconds.
   * @returns {*} Full date and local time.
   * @example
   * NormaliseDate.getFullDate();
   * => "Sat Jan 05 2019 22:11:54 GMT+0000 (Greenwich Mean Time)"
   */
  static getFullDate(date?: number): Date {
    if (date) return new Date(date);
    return new Date();
  };

  /**
   * 
   * @returns {*} Month as a number 0 - 11.
   * @example
   * NormaliseDate.currentMonthNumerical();
   * => 2
   */
  static currentMonthNumerical(): number {
    return NormaliseDate.getFullDate().getMonth();
  }

  /**
   * 
   * @returns {*} day of month as a number
   * @example
   * NormaliseDate.dayOfMonthNumerical();
   * => 27
   */
  static getDate(): number {
    return NormaliseDate.getFullDate().getDate();
  }

  /**
   * 
   * @returns {*} Month as a number 0 - 6.
   * @example
   * NormaliseDate.currentDayNumerical();
   * => 6
   */
  static currentDayNumerical(): number {
    return NormaliseDate.getFullDate().getDay();
  }

  /**
   * 
   * @returns {*} Year as a number.
   * @example
   * NormaliseDate.getYear();
   * => 2019
   */
  static getYear(): number {
    return NormaliseDate.getFullDate().getFullYear();
  }

  /**
   * 
   * @returns {*} Hours as a 1 - 24.
   * @example
   * NormaliseDate.getHours();
   * => 21
   */
  static getHours(): number {
    return NormaliseDate.getFullDate().getHours();
  }
  
  /**
   * 
   * @returns {*} minutes as a number, to 2 floating points.
   * @example 
   * NormaliseDate.getMinutes();
   * => 59
   */
  static getMinutes(): number {
    return NormaliseDate.getFullDate().getMinutes();
  }

  /**
   * 
   * @returns {*} seconds as a number, to 2 floating points.
   * @example 
   * NormaliseDate.getSeconds();
   * => 22
   */
  static getSeconds(): number {
    return NormaliseDate.getFullDate().getSeconds();
  }
  
  /**
   * 
   * @returns {*} month as a string.
   * @param {*} month passed in as numeric value.
   * @example 
   * NormaliseDate.getCurrentMonthName();
   * => "June"
   */
  static getCurrentMonthName(month?: number): string {
    const currentMonth = NormaliseDate.currentMonthNumerical();
    return monthNames[month || currentMonth];
  }

  /**
   * 
   * @returns {*} day as a string.
   * @param {*} day passed in as numeric value.
   * @example 
   * NormaliseDate.getDayName();
   * => "Monday"
   */
  static getDayName(day?: number): string {
    const currentDay = NormaliseDate.currentDayNumerical();
    return dayNames[day || currentDay];
  }

  /**
   * 
   * @param {showSeconds} boolean as to whether to show seconds on clock
   * @returns {*} time as a string.
   * @example 
   * NormaliseDate.getCurrentTime(true);
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
    const hours = checkTime(NormaliseDate.getHours());
    const minutes = checkTime(NormaliseDate.getMinutes());
    const seconds = checkTime(NormaliseDate.getSeconds());
    const clockTime = `${hours}:${minutes}${showSeconds? `:${seconds}` : ""}`;
    return clockTime;
  }

  /**
   * 
   * @param month numeric value for month
   * @param year numeric value for year
   * @returns {*} number of days in month.
   * @example
   * NormaliseDate.getNumberOfDaysInMonth(0, 2019)
   * => 31
   */
  static getNumberOfDaysInMonth(month: number, year: number): number {
    const monthForDate = month + 1;
    return new Date(year, monthForDate, 0).getDate();
  }

  /**
   *
   * @param date A numeric value for the date 1 - 31.
   * @returns {*} `Date`
   * @example
   * NormaliseDate.setDate(21);
   * => "Thu Dec 21 2018 22:45:49 GMT+0000 (Greenwich Mean Time)"
   */
  static setDate(day: number): Date {
    const setDate = NormaliseDate.getFullDate();
    setDate.setDate(day);
    return setDate;
  }

  /**
   *
   * @param year A numeric value for the month 0 - 11.
   * @returns {*} `Date`
   * @example
   * NormaliseDate.setMonth(2);
   * => "Thu Dec 02 2018 22:45:49 GMT+0000 (Greenwich Mean Time)"
   */
  static setMonth(month: number): Date {
    const newMonth = NormaliseDate.getFullDate();
    newMonth.setMonth(month);
    return newMonth;

  }

  /**
   *
   * @param year A numeric value for the year.
   * @returns {*} `Date`
   * @example
   * NormaliseDate.setYear(1982);
   * => "Thu Dec 06 1982 22:45:49 GMT+0000 (Greenwich Mean Time)"
   */
  static setYear(year: number): Date {
    const newYear = NormaliseDate.getFullDate();
    newYear.setFullYear(year);
    return newYear;
  }


  /**
   * 
   * @param year A numeric value for the year.
   * @param month A numeric value equal to the month. The value for January is 0, and other month values follow consecutively.
   * @param day A numeric value representing the day of the month.
   * If this value is not supplied, the value from a call to the getDate method is used. 1 - 31;
   * @returns {*} `Date`
   * @example
   * NormaliseDate.setDate(2019, 1, 21);
   * => "Thu Dec 06 2018 22:45:49 GMT+0000 (Greenwich Mean Time)"
   */
  static setFullDate(year: number, month?: number, day?: number): Date {
    const newDate = NormaliseDate.getFullDate();
    newDate.setDate(day);
    newDate.setMonth(month);
    newDate.setFullYear(year);
    return newDate;
  }
}