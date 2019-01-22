import * as moment from "moment";
import { Moment } from "moment";
import { List } from "immutable";
import { TimePoint } from "../helpers/dateHelper";
import { Event, EventMap } from "./types";

export function selectEvent(hash: string, events: EventMap) {
  return events.get(hash);
}

export function matchDayToHash(hash: string): string {
  return moment(hash)
    .startOf(TimePoint.day)
    .toISOString();
}

export function selectEventsToList(
  dateToMatch: Moment,
  events: EventMap
): List<Event> {
  return events
    .filter(
      (_, key) =>
        matchDayToHash(key) === dateToMatch.startOf("day").toISOString()
    )
    .toList();
}
