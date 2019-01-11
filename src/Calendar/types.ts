import { Moment } from "moment";

export interface CalendarShared {
  selectedDay: Moment;
  select: (date: Moment) => void;
}
