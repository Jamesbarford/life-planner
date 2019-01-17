import { Moment } from "moment";
import { List, Map } from "immutable";

// HELPERS
import {
  TimePointType,
  calculate,
  getHashIndex,
  createHash
} from "../helpers/dateHelper";

// TYPES
import { ApplicationState } from "../App/types";
import { MomentDictionary } from "./types";
import { CalendarState } from "./reducer";

export const getDate = (state: ApplicationState): Moment => state.calendar.date;
export const getCalendarState = (state: ApplicationState) => state.calendar;

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
 * @param timePoint timepoint i.e month
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
  timePoint: TimePointType
): MomentDictionary {
  const hashIndex = getHashIndex(timePoint, state);
  const hash = createHash(hashIndex, timePoint);
  if (state.momentList.get(hash)) return state.momentList;
  const hashMap = createDateHashMap(state, timePoint);
  return hashMap;
}

/**
 *
 * Creates a date hash map with a date hash e.g: `"month-12022019"` and the
 * states current date.
 *
 * @param state calendar state
 * @param timePoint timepoint i.e month
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
  timePoint: TimePointType
): MomentDictionary {
  const hashIndex = getHashIndex(timePoint, state);
  const hash = createHash(hashIndex, timePoint);
  const newList = List(calculate(state.date, timePoint, 1));
  const hashMap = Map({ [hash]: newList });
  return hashMap;
}

/**
 *
 * @param hash a date hash i.e `"month-12022019"`
 * @param momentDictionary a date hash map
 * @returns a `List` of moments
 * @example
 * selectMomentFromMap(hash, momentDictionary);
 * => List[5]
 * 0: Moment
 * 1: Moment
 * 2: Moment
 * 3: Moment
 * 4: Moment
 */
export function selectMomentFromMap(
  hash: string,
  momentDictionary: MomentDictionary
): List<Moment> {
  return momentDictionary.get(hash);
}
