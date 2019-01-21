import { Moment } from "moment";
import { Map } from "immutable";
import { TimePointType } from "../helpers/dateHelper";
import { MomentDictionary } from "../Calendar/types";
import { Category, Event } from "../events/types";

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
  entries: {
    events: Map<string, Event>;
    category: Map<string, Category>;
  };
  budget: {
    currentBudget: number;
    currentBudgetDisplay: string;
  };
}
