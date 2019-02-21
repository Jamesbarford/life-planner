import * as moment from "moment";
import { Moment } from "moment";
import { List } from "immutable";
import { TimePoint } from "../helpers/dateHelper";
import { Event, EventMap } from "./types";

export class EventSelector {
  public static matchDayToHash(hash: string): string {
    return moment(hash)
      .startOf(TimePoint.day)
      .toISOString();
  }

  public static selectEventsToList(
    dateToMatch: Moment,
    events: EventMap
  ): List<Event> {
    return events
      .filter(
        (_, key) =>
          EventSelector.matchDayToHash(key) ===
          dateToMatch.startOf("day").toISOString()
      )
      .toList();
  }
}
