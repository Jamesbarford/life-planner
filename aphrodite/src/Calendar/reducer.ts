import { Moment } from "moment";
import * as moment from "moment";
import { List, Map } from "immutable";

// HELPERS
import {
  TimePoint,
  TimePointType,
  calculate,
  alterTime
} from "../helpers/dateHelper";
import { createMomentList, createHash } from "./factories";

// ACTIONS
import { CalendarActions, CalendarActionTypes } from "./actions";

// TYPES
import { MomentDictionary } from "./types";
import { UpdateState } from "../types/global";

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
  const updateState: UpdateState<CalendarState> = newState => ({
    ...state,
    ...newState
  });

  switch (action.type) {
    case CalendarActions.CalendarNext: {
      const date = alterTime(state.date, 1, action.timePoint);
      return updateState({
        date,
        dayOfYear: date.dayOfYear(),
        currentMonth: date.month(),
        currentWeek: date.week()
      });
    }

    case CalendarActions.CalendarPrevious: {
      const date = alterTime(state.date, -1, action.timePoint);
      return updateState({
        date,
        dayOfYear: date.dayOfYear(),
        currentMonth: date.month(),
        currentWeek: date.week()
      });
    }

    case CalendarActions.CalendarChangeView: {
      const momentList = createMomentList(state, action.newView);
      return updateState({
        view: action.newView,
        momentList: state.momentList.merge(momentList)
      });
    }

    case CalendarActions.CalendarSelectDay:
      return updateState({
        dayOfYear: action.selectedDay.dayOfYear(),
        selectedDay: action.selectedDay
      });

    case CalendarActions.CalculateMomentArray:
      const momentList = createMomentList(state, action.timePoint);
      return updateState({ momentList: state.momentList.merge(momentList) });

    default:
      return state;
  }
}
