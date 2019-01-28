import { Moment } from "moment";
import { Map, List } from "immutable";

export interface CalendarShared {
  selectedDay: Moment;
  select: (key: string, date?: Moment) => void;
}

export type MomentDictionary = Map<string, List<Moment>>;
