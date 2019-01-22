import { Map } from "immutable";
import moment = require("moment");
import { createHashEvent } from "./factories";

describe("Events factories", () => {
  it("creates an events hash map", () => {
    const date = moment().startOf("day");
    const event = {
      id: "h",
      title: "super event",
      date
    };
    const hashMap = createHashEvent(date, event);
    expect(hashMap).toEqual(
      Map({ [date.toISOString()]: { id: "h", title: "super event", date } })
    );
  });
});
