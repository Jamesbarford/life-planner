import * as uuid from "uuid/v4";
import { Map } from "immutable";
import { EventBase } from "./types";

export function createHashEvent<T extends EventBase>(event: T): Map<string, T> {
  const hash = uuid();
  const eventMap = Map({ [hash]: event });
  return eventMap;
}
