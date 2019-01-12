import { Moment } from "moment";
import * as moment from "moment";
import { TimePoint, TimePointType } from "../helpers/dateHelper";
import { CalendarActions, CalendarActionTypes } from "./actions";

export class CalendarState {
  constructor(
    public date: Moment = moment().startOf(TimePoint.day),
    public selectedDay: Moment = moment().startOf(TimePoint.day),
    public currentMonth: number = moment().month(),
    public view: TimePointType = TimePoint.month
  ) {}
}

export function calendarReducer(
  state = new CalendarState(),
  action: CalendarActionTypes
) {
  switch (action.type) {
    case CalendarActions.CalendarNext:
      return {
        ...state,
        date: state.date.add(action.unitOfTime, action.timePoint)
      };

    case CalendarActions.CalendarPrevious:
      return {
        ...state,
        date: state.date.subtract(action.unitOfTime, action.timePoint)
      };

    case CalendarActions.CalendarChangeView:
      return {
        ...state,
        view: action.newView
      };

    case CalendarActions.CalendarSelectDay:
      return {
        ...state,
        selectedDay: action.selectedDay
      };

    default:
      return state;
  }
}
