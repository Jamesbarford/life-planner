import moment = require("moment");
import { EventSelector } from "./selectors";
import { createHashEvent } from "./factories";
import { List } from "immutable";

describe("Event selectors", () => {
  it("selects list events from hash map", () => {
    const date = moment().startOf("day");
    const event = { id: "h", title: "super event", date };
    const hashMap = createHashEvent(date, event);

    expect(EventSelector.selectEventsToList(date, hashMap)).toEqual(
      List([event])
    );
  });
});
