import { Moment } from "moment";
import { List } from "immutable";

// TYPES
import { ApplicationState } from "../App/types";
import { MomentDictionary } from "./types";

export const getDate = (state: ApplicationState): Moment => state.calendar.date;
export const getCalendarState = (state: ApplicationState) => state.calendar;

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
