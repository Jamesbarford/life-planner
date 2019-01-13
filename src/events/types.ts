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
  category: Category;
}

export interface Category extends EventBase {}

export interface Event extends EventBase {
  date: Moment;
  location?: string;
  category?: Category;
}

export type EventMap = Map<string, Event>;
export type ExpenditureMap = Map<string, Expenditure>;
export type CategoryMap = Map<string, Category>;
