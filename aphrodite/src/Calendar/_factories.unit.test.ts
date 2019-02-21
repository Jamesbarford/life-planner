import * as moment from "moment";
import { createHash } from "./factories";
import { TimePoint } from "../helpers/dateHelper";

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
