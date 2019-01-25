import { Map } from "immutable";
import { Moment } from "moment";
import { Event } from "./types";

export const createHashEvent = (
  date: Moment,
  event: Event
): Map<string, Event> => Map({ [date.toISOString()]: event });
