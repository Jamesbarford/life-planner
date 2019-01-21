import * as moment from "moment";
import { isMoment } from "moment";
import { removeWhiteSpace, isString } from "./util";
import { calculate, TimePoint } from "./dateHelper";

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
    const arr = calculate(date, TimePoint.month, 1);
    expect(isMoment(arr));
  });
});
