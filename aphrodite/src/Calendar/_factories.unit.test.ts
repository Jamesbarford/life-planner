import * as moment from "moment";
import { List, Map } from "immutable";
import { createHash } from "./factories";
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
});
