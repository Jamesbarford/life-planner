import { Moment } from "moment";
import { List, Map } from "immutable";

// HELPERS
import { TimePointType, calculate, getHashIndex } from "../helpers/dateHelper";
import { removeWhiteSpace } from "../helpers/util";

// TYPES
import { ApplicationState } from "../App/types";
import { MomentDictionary } from "./types";
import { CalendarState } from "./reducer";

export const getDate = (state: ApplicationState): Moment => state.calendar.date;
export const getCalendarState = (state: ApplicationState) => state.calendar;

/**
 *
 * @param date moment
 * @param t timepoint i.e month
 * @returns a date hash
 * @example
 * createHash(date, TimePoint.month);
 * => "month-2019-02-12T00:00:00.000Z"
 */
export function createHash(date: Moment, t: TimePointType): string {
  const formattedDate = date.startOf("day").toISOString();
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
 * @param state calendar state
 * @param t timepoint i.e month
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
  state: CalendarState,
  t: TimePointType
): MomentDictionary {
  const hashIndex = getHashIndex(t, state);
  const hash = createHash(hashIndex, t);
  if (state.momentList.get(hash)) return state.momentList;
  const hashMap = createDateHashMap(state, t);
  return hashMap;
}

/**
 *
 * Creates a date hash map with a date hash e.g: `"month-12022019"` and the
 * states current date.
 *
 * @param state calendar state
 * @param t timepoint i.e month
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
  const hashIndex = getHashIndex(t, state);
  const hash = createHash(hashIndex, t);
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
