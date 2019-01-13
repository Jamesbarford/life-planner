import * as uuid from "uuid/v4";
import { Map } from "immutable";
import { EventBase } from "./types";

export const createHashEvent = <T extends EventBase>(
  event: T
): Map<string, T> => Map({ [uuid()]: event });
