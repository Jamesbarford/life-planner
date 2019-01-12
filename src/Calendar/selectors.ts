import * as moment from "moment";
import { Moment } from "moment";
import { List, Map } from "immutable";
import { TimePointType, calculate } from "../helpers/dateHelper";
import { removeWhiteSpace } from "../helpers/util";
import { ApplicationState } from "../App/types";
import { MomentDictionary } from "./types";
import { CalendarState } from "./reducer";

export const getDate = (state: ApplicationState): Moment => state.calendar.date;
export const getCalendarState = (state: ApplicationState) => state.calendar;

export function createHashFromMonth(month: number): string {
  const date = moment().month(month);
  const formattedDate = date.format("DD MM YYYY");
  const hash = removeWhiteSpace(formattedDate);
  return hash;
}

export function createMomentList(
  t: TimePointType,
  state: CalendarState
): Map<string, List<Moment>> {
  const hash = createHashFromMonth(state.date.month());
  if (state.momentList.get(hash)) return state.momentList;
  const hashMap = createDateHashMap(state, t);
  return hashMap;
}

export function createDateHashMap(
  state: CalendarState,
  t: TimePointType
): Map<string, List<Moment>> {
  const hash = createHashFromMonth(state.date.month());
  const newList = List(calculate(state.date, t)(state.date, t));
  const hashMap = Map({ [hash]: newList });
  return hashMap;
}

export function selectMomentFromList(
  hash: string,
  momentDictionary: MomentDictionary
): List<Moment> {
  return momentDictionary.get(hash);
}
