import { unitOfTime, Moment } from "moment";
import { ActionBase } from "../types/global";
import { TimePoint } from "../helpers/dateHelper";

export enum CalendarActions {
  CalendarNext = "Calendar.Next",
  CalendarPrevious = "Calendar.Previous",
  CalendarChangeView = "CalendarChangeView",
  CalendarSelectDay = "CalendarSelectDay"
}

export class CalendarNext implements ActionBase {
  readonly type = CalendarActions.CalendarNext;
  constructor(
    public unitOfTime: number,
    public timePoint: unitOfTime.DurationConstructor
  ) {}
}

export class CalendarPrevious implements ActionBase {
  readonly type = CalendarActions.CalendarPrevious;
  constructor(
    public unitOfTime: number,
    public timePoint: unitOfTime.DurationConstructor
  ) {}
}

export class ChangeView implements ActionBase {
  readonly type = CalendarActions.CalendarChangeView;
  constructor(public newView: TimePoint) {}
}

export class SelectDay implements ActionBase {
  readonly type = CalendarActions.CalendarSelectDay;
  constructor(public selectedDay: Moment) {}
}

export type CalendarActionTypes =
  | CalendarNext
  | CalendarPrevious
  | ChangeView
  | SelectDay;
