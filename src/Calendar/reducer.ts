import { Moment } from "moment";
import * as moment from "moment";
import { List, Map } from "immutable";
import {
  TimePoint,
  TimePointType,
  calculate,
  alterTime
} from "../helpers/dateHelper";
import { CalendarActions, CalendarActionTypes } from "./actions";
import { MomentDictionary } from "./types";
import { createMomentList, createHashFromMonth } from "./selectors";

const newDate = moment().startOf(TimePoint.day);
const hash = createHashFromMonth(newDate.month(), TimePoint.month);
const newList = List(
  calculate(newDate, TimePoint.month)(newDate, TimePoint.month)
);
const map = Map({ [hash]: newList });

export class CalendarState {
  constructor(
    public date: Moment = newDate,
    public selectedDay: Moment = newDate,
    public currentMonth: number = moment().month(),
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
        currentMonth: date.month()
      };
    }

    case CalendarActions.CalendarPrevious: {
      const date = alterTime(state.date, -1, action.timePoint);
      return {
        ...state,
        date,
        currentMonth: date.month()
      };
    }

    case CalendarActions.CalendarChangeView: {
      const momentList = createMomentList(action.newView, state);
      return {
        ...state,
        view: action.newView,
        moment: state.momentList.merge(momentList)
      };
    }
    case CalendarActions.CalendarSelectDay:
      return {
        ...state,
        selectedDay: action.selectedDay
      };

    case CalendarActions.CalculateMomentArray:
      const { t } = action;
      const momentList = createMomentList(t, state);
      return { ...state, momentList: state.momentList.merge(momentList) };

    default:
      return state;
  }
}
