import * as moment from "moment";
import { EventSelector } from "./selectors";
import { List, Map } from "immutable";
import { EventMap } from "./types";

describe("Event selectors", () => {
  it("selects list events from hash map", () => {
    const date = moment().startOf("day");
    const event = { id: "h", title: "super event", date };
    const hashMap: EventMap = Map({ [date.toISOString()]: event });

    expect(EventSelector.selectEventsToList(date, hashMap)).toEqual(
      List([event])
    );
  });
});
