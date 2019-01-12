import { Moment } from "moment";
import * as moment from "moment";
import { TimePoint, TimePointType } from "../helpers/dateHelper";
import { CalendarActions, CalendarActionTypes } from "./actions";
import { MomentDictionary } from "./types";
import { createMomentList, createHashFromMonth } from "./selectors";

const newDate = moment().startOf(TimePoint.day);
export class CalendarState {
  constructor(
    public date: Moment = newDate,
    public selectedDay: Moment = newDate,
    public currentMonth: number = moment().month(),
    public view: TimePointType = TimePoint.month,
    public momentList: MomentDictionary = createMomentList(
      newDate,
      TimePoint.month,
      newDate.month()
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
      const hash = createHashFromMonth(date.month());
      if (state.momentList.get(hash)) return state;
      const momentList = createMomentList(date, t, state.date.month());
      return { ...state, momentList: state.momentList.merge(momentList) };

    default:
      return state;
  }
}
