import { Map } from "immutable";
import { EventBase } from "./types";
import { Moment } from "moment";
import { TimePoint } from "../helpers/dateHelper";

export const createHashEvent = <T extends EventBase>(
  date: Moment,
  event: T
): Map<string, T> =>
  Map({ [date.startOf(TimePoint.day).toISOString()]: event });
