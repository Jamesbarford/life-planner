import { Moment } from "moment";
import { Map } from "immutable";
import { TimePointType } from "../helpers/dateHelper";
import { MomentDictionary } from "../Calendar/types";
import { Event } from "../events/types";
import { Budget } from "../budget/types";

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
    category: Map<string, string>;
  };
  budget: {
    currentBudget: number;
    currentBudgetDisplay: string;
    month: number;
    monthlyBudget: Map<string, Budget>;
    budgetPerDay: Map<string, number>;
  };
}
