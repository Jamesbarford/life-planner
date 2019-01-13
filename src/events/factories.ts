import * as uuid from "uuid/v4";
import { Map } from "immutable";
import { Event, EventMap } from "./types";

export function createEvent(event: Event): Map<string, Event> {
  const hash = uuid();
  const eventMap = Map({ [hash]: event });
  return eventMap;
}
