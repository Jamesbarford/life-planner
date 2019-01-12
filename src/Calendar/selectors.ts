import * as moment from "moment";
import { Moment } from "moment";
import { List, Map } from "immutable";
import { TimePointType, calculate } from "../helpers/dateHelper";
import { removeWhiteSpace } from "../helpers/util";
import { ApplicationState } from "../App/types";
import { MomentDictionary } from "./types";

export const getDate = (state: ApplicationState): Moment => state.calendar.date;
export const createHashFromMonth = (month: number) => {
  const date = moment().month(month);
  const formattedDate = date.format("DD MM YYYY");
  const hash = removeWhiteSpace(formattedDate);
  return hash;
};

export const createMomentList = (
  date: Moment,
  t: TimePointType,
  month: number
) => {
  const hash = createHashFromMonth(month);
  const newList = List(calculate(date, t)(date, t));
  const map = Map({ [hash]: newList });
  return map;
};

export const selectMomentList = (momentDictionary: MomentDictionary) => {
  const hash = momentDictionary.keySeq().toArray()[0];
  const momentList = momentDictionary.get(hash);
  return momentList;
};

export const selectMomentFromList = (
  hash: string,
  momentDictionary: MomentDictionary
) => {
  return momentDictionary.get(hash);
};
