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
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

/**
 * @class NormaliseDate
 * 
 * A utlity class providing some absractions and helpers for the built in Date Api
 */
export class NormaliseDate {
  /**
   * @returns {*} Full date and local time.
   * @example
   * NormaliseDate.getEpochDate();
   * => Sat Jan 05 2019 22:11:54 GMT+0000 (Greenwich Mean Time)
   */
  static getEpochDate(): Date {
    return new Date();
  };

  /**
   * @returns {*} Month as a number 0 - 11.
   * @example
   * NormaliseDate.currentMonthNumerical();
   * => 2
   */
  static currentMonthNumerical(): number {
    return NormaliseDate.getEpochDate().getMonth();
  }

  /**
   * @returns {*} Month as a number 0 - 6.
   * @example
   * NormaliseDate.currentDayNumerical();
   * => 6
   */
  static currentDayNumerical(): number {
    return NormaliseDate.getEpochDate().getDay();
  }

  /**
   * @returns {*} Year as a number.
   * @example
   * NormaliseDate.getYear();
   * => 2019
   */
  static getYear(): number {
    return NormaliseDate.getEpochDate().getFullYear();
  }

  /**
   * @returns {*} Hours as a 1 - 24.
   * @example
   * NormaliseDate.getHours();
   * => 21
   */
  static getHours(): number {
    return NormaliseDate.getEpochDate().getHours();
  }
  
  /**
   * @returns {*} minutes as a number, to 2 floating points.
   * @example 
   * NormaliseDate.getMinutes();
   * => 59
   */
  static getMinutes(): number {
    return NormaliseDate.getEpochDate().getMinutes();
  }

  /**
   * @returns {*} seconds as a number, to 2 floating points.
   * @example 
   * NormaliseDate.getSeconds();
   * => 22
   */
  static getSeconds(): number {
    return NormaliseDate.getEpochDate().getSeconds();
  }
  
  /**
   * @returns {*} month as a string.
   * @example 
   * NormaliseDate.getCurrentMonthName();
   * => "June"
   */
  static getCurrentMonthName(): string {
    const currentMonth = NormaliseDate.currentMonthNumerical();
    return monthNames[currentMonth];
  }

  /**
   * @returns {*} day as a string.
   * @example 
   * NormaliseDate.getDayName();
   * => "Monday"
   */
  static getDayName(): string {
    const currentDay = NormaliseDate.currentDayNumerical();
    return dayNames[currentDay];
  }

  /**
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
}