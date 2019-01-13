import { Moment } from "moment";
import { TimePointType } from "../helpers/dateHelper";
import { MomentDictionary } from "../Calendar/types";

export interface ApplicationState {
  calendar: {
    date: Moment;
    today: Moment;
    selectedDay: Moment;
    view: TimePointType;
    currentMonth: number;
    currentWeek: number;
    dayOfYear: number;
    momentList: MomentDictionary;
  };
}
