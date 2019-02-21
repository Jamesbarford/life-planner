import { Moment } from "moment";
import * as moment from "moment";
import { List, Map } from "immutable";

// HELPERS
import {
  TimePoint,
  TimePointType,
  calculate,
  alterTime,
  getHashIndex
} from "../helpers/dateHelper";
import { createHash } from "./factories";

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
): CalendarState {
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
      const hashIndex = getHashIndex(action.newView, state);
      const hash = createHash(hashIndex, action.newView);

      if (state.momentList.has(hash)) {
        return updateState({ view: action.newView });
      }

      const momentArr = calculate(action.date, action.newView, 1);

      return updateState({
        view: action.newView,
        momentList: state.momentList.set(hash, List(momentArr))
      });
    }

    case CalendarActions.CalendarSelectDay:
      return updateState({
        dayOfYear: action.selectedDay.dayOfYear(),
        selectedDay: action.selectedDay
      });

    case CalendarActions.CalculateMomentArray:
      const hashIndex = getHashIndex(action.timePoint, state);
      const hash = createHash(hashIndex, action.timePoint);
      if (state.momentList.has(hash)) return state;

      const momentArr = calculate(action.date, action.timePoint, 1);

      return updateState({
        momentList: state.momentList.set(hash, List(momentArr))
      });

    default:
      return state;
  }
}
