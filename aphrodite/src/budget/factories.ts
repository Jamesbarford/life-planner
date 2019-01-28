import { Map } from "immutable";
import { Moment } from "moment";
import { Budget } from "./types";
import { createHash } from "../Calendar/factories";
import { TimePoint } from "../helpers/dateHelper";

export function setMonthBudget(date: Moment, budget: Budget) {
  const hash = createHash(date, TimePoint.month);
  return Map({ [hash]: budget });
}
