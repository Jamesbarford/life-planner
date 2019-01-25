import moment = require("moment");
import { selectEventsToList, selectEvent, matchDayToHash } from "./selectors";
import { createHashEvent } from "./factories";
import { List } from "immutable";
import { TimePoint } from "../helpers/dateHelper";

describe("Event selectors", () => {
  it("selects one event from hash map", () => {
    const date = moment()
      .startOf(TimePoint.hour)
      .add(5, TimePoint.hours);
    const event = { id: "h", title: "super event", date };
    const hash = date.toISOString();
    const hashMap = createHashEvent(date, event);

    expect(selectEvent(hash, hashMap)).toEqual(event);
  });

  it("selects list events from hash map", () => {
    const date = moment().startOf("day");
    const event = { id: "h", title: "super event", date };
    const hashMap = createHashEvent(date, event);

    expect(selectEventsToList(date, hashMap)).toEqual(List([event]));
  });
});
