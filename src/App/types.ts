import { TimePoint } from "../helpers/dateHelper";
import { Moment } from "moment";

export interface ApplicationState {
  calendar: {
    date: Moment;
    selectedDay: Moment;
    view: TimePoint;
    currentMonth: number;
  };
}
