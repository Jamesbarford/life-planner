import { Moment } from "moment";
import * as moment from "moment";
import { List, Map } from "immutable";

// HELPERS
import {
  TimePoint,
  TimePointType,
  calculate,
  alterTime,
  createHash
} from "../helpers/dateHelper";
import { createMomentList } from "./selectors";

// ACTIONS
import { CalendarActions, CalendarActionTypes } from "./actions";

// TYPES
import { MomentDictionary } from "./types";

const newDate = moment().startOf(TimePoint.day);
const hash = createHash(newDate, TimePoint.month);
const newList = List(calculate(newDate, TimePoint.month, 1));
const map = Map({ [hash]: newList });

export class CalendarState {
  constructor(
    public date: Moment = newDate,
    public today: Moment = Object.freeze(newDate),
    public selectedDay: Moment = newDate.clone(),
    public currentMonth: number = moment().month(),
    public currentWeek: number = moment().week(),
    public dayOfYear: number = newDate.dayOfYear(),
    public view: TimePointType = TimePoint.month,
    public momentList: MomentDictionary = map
  ) {}
}

export function calendarReducer(
  state = new CalendarState(),
  action: CalendarActionTypes
) {
  switch (action.type) {
    case CalendarActions.CalendarNext: {
      const date = alterTime(state.date, 1, action.timePoint);
      return {
        ...state,
        date,
        dayOfYear: date.dayOfYear(),
        currentMonth: date.month(),
        currentWeek: date.week()
      };
    }

    case CalendarActions.CalendarPrevious: {
      const date = alterTime(state.date, -1, action.timePoint);
      return {
        ...state,
        date,
        dayOfYear: date.dayOfYear(),
        currentMonth: date.month(),
        currentWeek: date.week()
      };
    }

    case CalendarActions.CalendarChangeView: {
      const momentList = createMomentList(state, action.newView);
      return {
        ...state,
        view: action.newView,
        momentList: state.momentList.merge(momentList)
      };
    }
    case CalendarActions.CalendarSelectDay:
      return {
        ...state,
        dayOfYear: action.selectedDay.dayOfYear(),
        selectedDay: action.selectedDay
      };

    case CalendarActions.CalculateMomentArray:
      const momentList = createMomentList(state, action.timePoint);
      return { ...state, momentList: state.momentList.merge(momentList) };

    default:
      return state;
  }
}
