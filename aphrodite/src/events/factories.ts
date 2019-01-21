import { Map } from "immutable";
import { Event } from "./types";
import { Moment } from "moment";

export const createHashEvent = <T extends Event>(
  date: Moment,
  event: T
): Map<string, T> => Map({ [date.toISOString()]: event });
