import * as moment from "moment";
import { Moment } from "moment";
import { EventsState } from "./reducer";
import { TimePoint } from "../helpers/dateHelper";

export function selectEvent(hash: string, state: EventsState) {
  return state.events.get(hash);
}

export function matchDayToHash(hash: string): string {
  return moment(hash)
    .startOf(TimePoint.day)
    .toISOString();
}
