import * as moment from "moment";
import { isMoment } from "moment";
import { removeWhiteSpace, isString } from "./util";
import { calculate, TimePoint, alterTime } from "./dateHelper";
import {
  currencyFormatter,
  currencyToNumber,
  mergeAmount
} from "./currencyHelper";

describe("Util functions", () => {
  it("should remove whitespace", () => {
    const string = "  h e ll o   ";
    const nowWhiteSpace = removeWhiteSpace(string);

    expect(nowWhiteSpace).toEqual("hello");
  });

  it("should return true for string", () => {
    const string = "hello";

    expect(isString(string)).toBe(true);
  });

  it("should return false for a number", () => {
    const number = 2;

    expect(isString(number)).toBe(false);
  });
});

describe("Date helpers", () => {
  it("should return an array of moments", () => {
    const date = moment();

    expect(isMoment(calculate(date, TimePoint.month, 1))).toBe(true);
  });

  it("will increment date by 1 month", () => {
    const date = moment().startOf("day");

    expect(alterTime(date.clone(), 1, TimePoint.month)).toBeGreaterThan(
      date.month()
    );
  });

  describe("Currency helpers", () => {
    it("converts a number into currency", () => {
      const number = "2000000";

      expect(currencyFormatter("en-GB", number)).toEqual("£2,000,000");
    });

    it("converts currency to a number", () => {
      const currency = "£2,000,000";

      expect(currencyToNumber(currency)).toEqual(2000000);
    });

    it("merges two numbers to create a floating point", () => {
      const num1 = 10000;
      const num2 = 12;

      expect(mergeAmount(num1, num2)).toEqual(10000.12);
    });
  });
});
