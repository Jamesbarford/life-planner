import { Moment } from "moment";
import { cloneDeep, isEqual } from "lodash";
import {
  TimePointType,
  WeekCache,
  TimePoint,
  findIncrementalTimePoint
} from "../helpers/dateHelper";
import { removeWhiteSpace } from "../helpers/util";
import { ApplicationState } from "../App/types";

export const getDate = (state: ApplicationState): Moment => state.calendar.date;
