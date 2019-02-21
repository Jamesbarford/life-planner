import { Moment } from "moment";

// TYPES
import { ApplicationState } from "../App/types";

export const getDate = (state: ApplicationState): Moment => state.calendar.date;
export const getCalendarState = (state: ApplicationState) => state.calendar;
