import { Moment } from "moment";
import * as moment from "moment";
import { TimePoint, TimePointType, calculate } from "../helpers/dateHelper";
import { CalendarActions, CalendarActionTypes } from "./actions";

const newDate = moment().startOf(TimePoint.day);
export class CalendarState {
  constructor(
    public date: Moment = newDate,
    public selectedDay: Moment = newDate,
    public currentMonth: number = moment().month(),
    public view: TimePointType = TimePoint.month,
    public momentArr: Array<Moment> = calculate(newDate)(
      newDate,
      TimePoint.month
    )
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

    case CalendarActions.CalculateMomentArray:
      const { date, t } = action;
      const momentArr = calculate(date, t)(date, t);
      return { ...state, momentArr };

    default:
      return state;
  }
}
