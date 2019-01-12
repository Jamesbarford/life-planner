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

/**
 *
 * @param month numerical month
 * @param t timepoint i.e month
 * @returns a date hash
 * @example
 * createHashFromMonth(1, TimePoint.month);
 * => "month-12022019"
 */
export function createHashFromMonth(month: number, t: TimePointType): string {
  const date = moment().month(month);
  const formattedDate = date.format("DD MM YYYY");
  const hash = removeWhiteSpace(formattedDate);
  return `${t}-${hash}`;
}

/**
 *
 * A memoized helper to either create a date hash map or to retrive the existing
 * map via a lookup.
 *
 * This uses the states date which will grab the month to create the hash, if the
 * hash exists in the `Map` it will get that `List` else it will compute a new
 * `List` and add it to the `Map`
 *
 * @param t timepoint i.e month
 * @param state calendar state
 * @returns a `Map` with a `datehash` as it's key containing a `List` of `moments`
 * @example
 * createMomentList(TimePoint.month, state);
 * => { Map[1] {"month-12012019" => List[5]
 *   0: Moment
 *   1: Moment
 *   2: Moment
 *   3: Moment
 *   4: Moment
 * }
 */
export function createMomentList(
  t: TimePointType,
  state: CalendarState
): MomentDictionary {
  const hash = createHashFromMonth(state.date.month(), t);
  if (state.momentList.get(hash)) return state.momentList;
  const hashMap = createDateHashMap(state, t);
  return hashMap;
}

/**
 *
 * Creates a date hash map with a date hash e.g: `"month-12022019"` and the
 * states current date.
 *
 * @param t timepoint i.e month
 * @param state calendar state
 * @returns a `Map` with a `datehash` as it's key containing a `List` of `moments`
 * @example
 * createMomentList(TimePoint.month, state);
 * => { Map[1] {"month-12012019" => List[5]
 *   0: Moment
 *   1: Moment
 *   2: Moment
 *   3: Moment
 *   4: Moment
 * }
 */
export function createDateHashMap(
  state: CalendarState,
  t: TimePointType
): MomentDictionary {
  const hash = createHashFromMonth(state.date.month(), t);
  const newList = List(calculate(state.date, t)(state.date, t));
  const hashMap = Map({ [hash]: newList });
  return hashMap;
}

/**
 *
 * @param hash a date hash i.e `"month-12022019"`
 * @param momentDictionary a date hash map
 * @returns a `List` of moments
 * @example
 * selectMomentFromList(hash, momentDictionary);
 * => List[5]
 * 0: Moment
 * 1: Moment
 * 2: Moment
 * 3: Moment
 * 4: Moment
 */
export function selectMomentFromList(
  hash: string,
  momentDictionary: MomentDictionary
): List<Moment> {
  return momentDictionary.get(hash);
}
