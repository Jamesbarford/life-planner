import * as moment from "moment";
import { List, Map } from "immutable";
import { createHash, createMomentList, createDateHashMap } from "./factories";
import { TimePoint, calculate } from "../helpers/dateHelper";
import { CalendarState } from "./reducer";

const state = new CalendarState();

describe("Date factories", () => {
  it("creates a date hash", () => {
    const date = moment()
      .month(0)
      .day(22);

    expect(createHash(date, TimePoint.month)).toEqual(
      "month-2019-02-11T00:00:00.000Z"
    );
  });

  it("creates a List of moments", () => {
    const date = moment().startOf(TimePoint.day);
    const momentArr = calculate(date, TimePoint.month, 1);
    const list = createMomentList(state, TimePoint.month);
    const hash = createHash(date, TimePoint.month);

    expect(list.get(hash)).toEqual(List(momentArr));
  });

  it("creates a date hash map", () => {
    const date = moment().startOf(TimePoint.day);
    const momentList = List(calculate(date, TimePoint.month, 1));
    const hash = createHash(date, TimePoint.month);

    expect(createDateHashMap(state, TimePoint.month)).toEqual(
      Map({ [hash]: momentList })
    );
  });
});
