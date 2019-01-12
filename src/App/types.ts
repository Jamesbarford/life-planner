import { Moment } from "moment";
import { TimePointType } from "../helpers/dateHelper";

export interface ApplicationState {
  calendar: {
    date: Moment;
    selectedDay: Moment;
    view: TimePointType;
    currentMonth: number;
    momentArr: Array<Moment>;
  };
}
