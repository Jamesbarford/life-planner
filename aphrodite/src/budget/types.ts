import { Moment } from "moment";

export interface Budget {
  id: string;
  amount: number | string;
  date: Moment;
}
