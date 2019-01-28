import { Moment } from "moment";
import { ActionBase } from "../types/global";
import { TimePointType } from "../helpers/dateHelper";

export enum CalendarActions {
  CalendarNext = "Calendar.Next",
  CalendarPrevious = "Calendar.Previous",
  CalendarChangeView = "Calendar.ChangeView",
  CalendarSelectDay = "Calendar.SelectDay",
  CalculateMomentArray = "Calendar.CalculateMomentArray"
}

export class CalendarNext implements ActionBase {
  public readonly type = CalendarActions.CalendarNext;
  constructor(public unitOfTime: number, public timePoint: TimePointType) {}
}

export class CalendarPrevious implements ActionBase {
  public readonly type = CalendarActions.CalendarPrevious;
  constructor(public unitOfTime: number, public timePoint: TimePointType) {}
}

export class ChangeView implements ActionBase {
  public readonly type = CalendarActions.CalendarChangeView;
  constructor(public newView: TimePointType) {}
}

export class SelectDay implements ActionBase {
  public readonly type = CalendarActions.CalendarSelectDay;
  constructor(public selectedDay: Moment) {}
}

export class CalculateMomentArray implements ActionBase {
  public readonly type = CalendarActions.CalculateMomentArray;
  constructor(public timePoint: TimePointType) {}
}

export type CalendarActionTypes =
  | CalendarNext
  | CalendarPrevious
  | ChangeView
  | SelectDay
  | CalculateMomentArray;
