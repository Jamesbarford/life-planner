import { Moment } from "moment";
import { Map } from "immutable";

interface EventBase {
  id: string;
  title: string;
  description?: string;
}

export interface Expenditure extends EventBase {
  date: Moment;
  time: Moment;
  amount: number;
  category: string;
}

export interface EventResponseBody {
  category: string;
  date: Moment;
  description: string;
  id: string;
  time: string;
  title: string;
}

export interface Event extends EventBase {
  date: Moment;
  location?: string;
  category?: string;
}

export type EventMap = Map<string, Event>;
export type ExpenditureMap = Map<string, Expenditure>;
export type CategoryMap = Map<string, string>;
