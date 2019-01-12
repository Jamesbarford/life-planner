import { Moment } from "moment";
import * as moment from "moment";
import { List, Map } from "immutable";
import { TimePoint, TimePointType, calculate } from "../helpers/dateHelper";
import { CalendarActions, CalendarActionTypes } from "./actions";
import { MomentDictionary } from "./types";
import { createMomentList, createHashFromMonth } from "./selectors";

const newDate = moment().startOf(TimePoint.day);
const hash = createHashFromMonth(newDate.month());
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
    case CalendarActions.CalendarNext:
      return {
        ...state,
        date: state.date.add(action.unitOfTime, action.timePoint),
        currentMonth: state.date
          .add(action.unitOfTime, action.timePoint)
          .month()
      };

    case CalendarActions.CalendarPrevious:
      return {
        ...state,
        date: state.date.subtract(action.unitOfTime, action.timePoint),
        currentMonth: state.date
          .subtract(action.unitOfTime, action.timePoint)
          .month()
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
      const { t } = action;
      const momentList = createMomentList(t, state);
      return { ...state, momentList: state.momentList.merge(momentList) };

    default:
      return state;
  }
}
