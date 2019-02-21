import { Moment } from "moment";

// HELPERS
import { removeWhiteSpace } from "../helpers/util";
import { TimePointType } from "../helpers/dateHelper";

/**
 *
 * @param date moment
 * @param timePoint timepoint i.e month
 * @returns a date hash
 * @example
 * createHash(date, TimePoint.month);
 * => "month-2019-02-12T00:00:00.000Z"
 */
export function createHash(date: Moment, timePoint: TimePointType): string {
  const formattedDate = date.startOf("day").toISOString();
  const hash = removeWhiteSpace(formattedDate);
  return `${timePoint}-${hash}`;
}
