import { Map } from "immutable";
import { EventBase } from "./types";
import { Moment } from "moment";

export const createHashEvent = <T extends EventBase>(
  date: Moment,
  event: T
): Map<string, T> => Map({ [date.toISOString()]: event });
